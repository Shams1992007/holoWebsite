import React, { useEffect, useState } from "react";
import "./users.css"; // Optional: Add styling for the Users page

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from the backend API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://api.holoapp.tech:3000/api/get-users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Ensure data is an array
          setUsers(Array.isArray(data) ? data : []);
        } else {
          setError("Failed to fetch users");
        }
      } catch (error) {
        setError("An error occurred: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-wrapper">
      <h1>Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Signup Method</th>
              <th>Registered</th>
              <th>Registered At</th>
              <th>User Completed</th>
              <th>User Completed At</th>
              <th>Driver Completed</th>
              <th>Driver Completed At</th>
              <th>Signup App</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(users) && users.length > 0) ? (
              users.map((user) => 
                (<tr key={user.id}>
                <td>{user.userID}</td>
                <td>{user.name}</td>
                <td>{user.email || "N/A"}</td>
                <td>{user.contact}</td>
                <td>{user.auth}</td>
                <td>{user.register}</td>
                <td>{user.created_at}</td>
                <td>{user.completeUser}</td>
                <td>{user.user_created_at}</td>
                <td>{user.completeDriver}</td>
                <td>{user.driver_created_at}</td>
                <td>{user.app}</td>
                </tr>)
              )
            ) : (
              <tr><td colSpan="4">No users found</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;