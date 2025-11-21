import React, { useState } from "react";

export default function RegistrationForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Nom: ${form.name}\nEmail: ${form.email}\nMot de passe: ${form.password}`);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom complet
          <input name="name" value={form.name} onChange={handleChange} required />
        </label><br/>
        <label>Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label><br/>
        <label>Mot de passe
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label><br/>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
