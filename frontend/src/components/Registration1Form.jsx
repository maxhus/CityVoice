import React, { useState } from "react";

export default function RegistrationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    image: null
  });

  // Pour gérer les changements dans les champs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Pour gérer l'upload de l'image
  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // Pour récupérer la géolocalisation
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setForm({
          ...form,
          location: `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`
        });
      });
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pour le moment, on affiche juste les infos
    alert(`Nom: ${form.name}\nEmail: ${form.email}\nMot de passe: ${form.password}\nLocation: ${form.location}\nImage: ${form.image ? form.image.name : "Aucune"}`);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom complet
          <input name="name" value={form.name} onChange={handleChange} required />
        </label><br/><br/>
        <label>Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label><br/><br/>
        <label>Mot de passe
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label><br/><br/>
        <label>Photo de profil
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label><br/><br/>
        <button type="button" onClick={handleGetLocation}>Récupérer ma position</button><br/><br/>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
