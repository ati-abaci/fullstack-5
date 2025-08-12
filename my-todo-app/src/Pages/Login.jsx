import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.token)
        throw new Error(data.message || "Invalid credentials");
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
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
          <h3 className="mb-3 text-center">Log in</h3>
          <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
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
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
          <div className="text-center mt-3">
            <span>No account? </span>
            <Link to="/signup">Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
