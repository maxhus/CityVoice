import React, { useState } from "react";

export default function ReportForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        alert(`Position récupérée : ${pos.coords.latitude}, ${pos.coords.longitude}`);
      },
      () => alert("Impossible d'obtenir la position.")
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description, category, image, location });
    alert("Signalement prêt à être envoyé !");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
      <h2>Signaler un problème</h2>

      <input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />

      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choisir une catégorie</option>
        <option value="infrastructure">Infrastructure</option>
        <option value="proprete">Propreté</option>
        <option value="securite">Sécurité</option>
      </select>

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <button type="button" onClick={getLocation}>Récupérer ma position</button>
      <button type="submit">Envoyer</button>
    </form>
  );
}
