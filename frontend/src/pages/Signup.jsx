import React, { useState } from "react";
import "./Signup.css";

export default function Signup() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Data submitted:", formData);
    alert("Inscription réussie !");
  }

  return (
    <div className="signup-container">
      <h2>Inscription</h2>

      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="Prénom" onChange={handleChange} />
        <input name="lastName" placeholder="Nom" onChange={handleChange} />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} />
        <input name="password" placeholder="Mot de passe" type="password" onChange={handleChange} />
        <button type="submit">Créer un compte</button>
      </form>
    </div>
  );
}
