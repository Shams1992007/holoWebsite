import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInBrta = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleSignInBrta = (e) => {
    e.preventDefault();

    // Check credentials
    if (username === "admin" && password === "12345") {
    // Set authentication flag
    localStorage.setItem("isAuthenticated", "true");      
      // Redirect to the user list page
      history.push("/userListAdminBrta");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Sign In</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSignInBrta}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInBrta;