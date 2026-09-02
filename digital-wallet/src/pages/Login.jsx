import { useState } from "react";
import { Link } from "react-router-dom";
import { CircleDollarSign, LockKeyhole, Mail } from "lucide-react";
import api from "../api/api";

export default function Login({ onLogin }) {
 const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
 const submit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/auth/login", {
      email: email,
      password: password
    });

    console.log("Login successful:", response.data);

    onLogin(response.data);

  } catch (error) {
    console.error("Login failed:", error);

    alert(
      error.response?.data?.message ||
      "Invalid email or password"
    );
  }
};
  return <div className="auth-page"><div className="auth-card"><div className="auth-logo"><CircleDollarSign size={25}/></div><h1>Welcome back</h1><p>Sign in to your PayFlow wallet.</p><form onSubmit={submit}><label>Email address</label><div className="input-icon"><Mail size={18}/><input
  type="email"
  value={email}
  onChange={e => setEmail(e.target.value)}
  placeholder="you@example.com"
  required
/>
</div><label>Password</label><div className="input-icon"><LockKeyhole size={18}/><input
  type="password"
  value={password}
  onChange={e => setPassword(e.target.value)}
  placeholder="••••••••"
  required
/></div><button className="btn primary-btn full-btn">Sign in</button></form><p className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></p></div></div>;
}