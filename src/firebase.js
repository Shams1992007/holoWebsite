import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZucrdkQMyKBTvDP4jVGTgHFvmSRb3Zkg",
  authDomain: "holo-chalok-28353.firebaseapp.com",
  projectId: "holo-chalok-28353",
  storageBucket: "holo-chalok-28353.firebasestorage.app",
  messagingSenderId: "822622481795",
  appId: "1:822622481795:web:d098978d9c5cfb99eadab6",
  measurementId: "G-VS8CQJ3MJK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
