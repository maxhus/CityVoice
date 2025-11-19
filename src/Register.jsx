import React, { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    alert("Inscription réussie (simulation) !");
  };

  return (
    <div style={{ display:"flex", justifyContent:"center", marginTop:"50px" }}>
      <form 
        onSubmit={handleSubmit}
        style={{
          display:"flex",
          flexDirection:"column",
          gap:"10px",
          width:"300px",
          padding:"20px",
          border:"1px solid #ccc",
          borderRadius:"10px"
        }}
      >
        <h2>Créer un compte</h2>

        <input 
          type="text"
          placeholder="Nom complet"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input 
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input 
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input 
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
