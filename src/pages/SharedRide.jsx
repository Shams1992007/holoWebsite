// Public live-ride viewer. Opened via the driver app's "Share Live Ride" button,
// which hands out https://holoapp.tech/shared/<token> (a 404.html shim rewrites
// that path into the HashRouter route /#/shared/<token> on GitHub Pages).
//
// Data contract (Go backend, served via nginx at https://api.holoapp.tech):
//   GET /api/sharedRide/{token}          -> { rideID, rideType, chalokPath[], jatriPath[] }
//        (path point = { latitude, longitude }; 404 = bad token, 410 = ride ended)
//   GET /api/sharedRide/{token}/stream   -> SSE, each event: { side, data:{latitude,longitude} }
//        side 0 = driver (chalok), side 1 = passenger (jatri)
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const API_BASE = "https://api.holoapp.tech";

// Vehicle emoji marker, rotated to face the driver's direction of travel.
// Emojis face LEFT (west), so CSS rotate of (bearing + 90) aims the nose along it.
const carIcon = (rot) =>
  L.divIcon({
    className: "holo-shared-car",
    html:
      '<div style="width:30px;height:30px;display:flex;align-items:center;justify-content:center;' +
      'font-size:24px;text-shadow:0 1px 3px rgba(0,0,0,.45);transform:rotate(' + rot + 'deg);">🚗</div>',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

const dot = (color) =>
  L.divIcon({
    className: "holo-shared-dot",
    html:
      '<div style="width:14px;height:14px;border-radius:50%;background:' + color +
      ';border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.4);"></div>',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

// Initial compass bearing A->B (deg, 0=N clockwise).
function bearing(a, b) {
  const r = Math.PI / 180;
  const p1 = a[0] * r, p2 = b[0] * r, dL = (b[1] - a[1]) * r;
  const y = Math.sin(dL) * Math.cos(p2);
  const x = Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dL);
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}

// Keep the whole path in view as it grows (does not fight user interaction after
// the first fits — it only fits while points are still coming in early).
function FitToPath({ pts }) {
  const map = useMap();
  const fittedOnce = useRef(false);
  useEffect(() => {
    if (!pts || pts.length === 0) return;
    if (pts.length === 1) {
      if (!fittedOnce.current) map.setView(pts[0], 15);
    } else {
      map.fitBounds(L.latLngBounds(pts), { padding: [40, 40], maxZoom: 16 });
    }
    fittedOnce.current = true;
  }, [pts, map]);
  return null;
}

const toLatLng = (p) => [Number(p.latitude), Number(p.longitude)];
const valid = (ll) => Number.isFinite(ll[0]) && Number.isFinite(ll[1]);

export default function SharedRide() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // loading | live | notfound | ended | error
  const [chalok, setChalok] = useState([]); // [[lat,lon],...]
  const [jatri, setJatri] = useState([]);

  useEffect(() => {
    let es = null;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/sharedRide/${token}`);
        if (res.status === 404) { if (!cancelled) setStatus("notfound"); return; }
        if (res.status === 410) { if (!cancelled) setStatus("ended"); return; }
        if (!res.ok) { if (!cancelled) setStatus("error"); return; }
        const data = await res.json();
        if (cancelled) return;
        setChalok((data.chalokPath || []).map(toLatLng).filter(valid));
        setJatri((data.jatriPath || []).map(toLatLng).filter(valid));
        setStatus("live");

        // Live updates.
        es = new EventSource(`${API_BASE}/api/sharedRide/${token}/stream`);
        es.onmessage = (e) => {
          try {
            const msg = JSON.parse(e.data);
            const ll = toLatLng(msg.data || {});
            if (!valid(ll)) return;
            if (msg.side === 1) setJatri((p) => [...p, ll]);
            else setChalok((p) => [...p, ll]);
          } catch (_) { /* ignore malformed frames */ }
        };
        es.onerror = () => { /* EventSource auto-reconnects; keep showing last known */ };
      } catch (_) {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      if (es) es.close();
    };
  }, [token]);

  if (status === "loading")
    return <Centered title="Loading live ride…" />;
  if (status === "notfound")
    return <Centered title="Share link not found" sub="This link is invalid or has expired." />;
  if (status === "ended")
    return <Centered title="This ride has ended" sub="Live tracking is only available during an active ride." />;
  if (status === "error")
    return <Centered title="Couldn’t load the ride" sub="Please check your connection and try again." />;

  const carPos = chalok.length ? chalok[chalok.length - 1] : null;
  const carRot = chalok.length >= 2
    ? (bearing(chalok[chalok.length - 2], chalok[chalok.length - 1]) + 90) % 360
    : 90; // default: nose pointing up
  const allPts = chalok.concat(jatri);
  const center = carPos || (allPts.length ? allPts[0] : [23.78, 90.35]);

  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column" }}>
      <div style={{
        padding: "12px 16px", background: "#111", color: "#fff",
        fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#1E9E4A", display: "inline-block", boxShadow: "0 0 0 3px rgba(30,158,74,.3)" }} />
        Live Ride
      </div>
      <div style={{ flex: 1 }}>
        <MapContainer center={center} zoom={14} style={{ height: "100%", width: "100%" }} zoomControl={true}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {jatri.length > 1 && <Polyline positions={jatri} pathOptions={{ color: "#9CA3AF", weight: 4, opacity: 0.7, dashArray: "6 8" }} />}
          {chalok.length > 1 && <Polyline positions={chalok} pathOptions={{ color: "#2563EB", weight: 5, opacity: 0.9 }} />}
          {chalok.length > 0 && <Marker position={chalok[0]} icon={dot("#1E9E4A")} />}
          {carPos && <Marker position={carPos} icon={carIcon(carRot)} zIndexOffset={1000} />}
          {jatri.length > 0 && <Marker position={jatri[jatri.length - 1]} icon={dot("#E0463C")} />}
          <FitToPath pts={allPts} />
        </MapContainer>
      </div>
    </div>
  );
}

function Centered({ title, sub }) {
  return (
    <div style={{
      position: "fixed", inset: 0, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center", padding: 24,
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🚗</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#111" }}>{title}</div>
      {sub && <div style={{ fontSize: 14, color: "#666", marginTop: 8, maxWidth: 320 }}>{sub}</div>}
    </div>
  );
}
