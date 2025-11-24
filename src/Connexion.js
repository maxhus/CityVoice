import React, { useState } from "react";
import "./Connexion.css";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let ok = true;

    if (!email.includes("@")) {
      setEmailError("Email invalide");
      ok = false;
    }

    if (password.length < 6) {
      setPasswordError("Minimum 6 caractères");
      ok = false;
    }

    if (!ok) return;

    alert("Connexion réussie !");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error">{emailError}</p>}

          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error">{passwordError}</p>}

          <button type="submit" className="btn-primary">
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}
