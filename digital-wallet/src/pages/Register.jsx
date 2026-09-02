import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CircleDollarSign,
  UserRound,
  Mail,
  LockKeyhole
} from "lucide-react";

export default function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister({
      name,
      email,
      password
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <CircleDollarSign size={25} />
        </div>

        <h1>Create your wallet</h1>
        <p>Open your free PayFlow account.</p>

        <form onSubmit={handleSubmit}>

          <label>Full name</label>

          <div className="input-icon">
            <UserRound size={18} />

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Abhimanyu Sharma"
              required
            />
          </div>

          <label>Email address</label>

          <div className="input-icon">
            <Mail size={18} />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <label>Password</label>

          <div className="input-icon">
            <LockKeyhole size={18} />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>

          <button className="btn primary-btn full-btn">
            Create account
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>

      </div>
    </div>
  );
}