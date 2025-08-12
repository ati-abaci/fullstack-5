import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Signup failed");
      }
      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ background: "#f5f7fb" }}
    >
      <div className="card shadow-sm" style={{ width: 400 }}>
        <div className="card-body">
          <h3 className="mb-3 text-center">Create account</h3>
          <form onSubmit={handleSignup} className="d-flex flex-column gap-3">
            <input
              className="form-control"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error ? (
              <div className="alert alert-danger p-2 m-0">{error}</div>
            ) : null}
            <button className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
          <div className="text-center mt-3">
            <span>Already have an account? </span>
            <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
