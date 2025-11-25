import React, { useState } from "react";
import Header from "../components/Header";
import MapView from "../components/MapView";
import "./Signalement.css";

export default function Signalement() {
  const [recherche, setRecherche] = useState("");
  const [titre, setTitre] = useState("");
  const [categorie, setCategorie] = useState("");
  const [commentaires, setCommentaires] = useState("");

  const mockReports = [
    {
      id: 1,
      title: "Nid de poule",
      category: "Infrastructure",
      status: "en cours",
      latitude: 48.8566,
      longitude: 2.3522,
    },
    {
      id: 2,
      title: "Poubelle débordante",
      category: "Propreté",
      status: "en cours",
      latitude: 48.8606,
      longitude: 2.3376,
    },
    {
      id: 3,
      title: "Lampadaire cassé",
      category: "Sécurité",
      status: "en cours",
      latitude: 48.8698,
      longitude: 2.3078,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { titre, categorie, commentaires, localisation: recherche };
    console.log("Signalement envoyé :", data);
    alert("Signalement créé !");

    setTitre("");
    setCategorie("");
    setCommentaires("");
    setRecherche("");
  };

  return (
    <div className="signalement-page">
      <Header />

      <div className="signalement-container">
        <div className="signalement-box">
          <div className="signalement-left">
            <input
              type="text"
              placeholder="Recherche localisation"
              className="search-input"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />

            <div className="map-wrapper">
              <MapView reports={mockReports} showNewReportButton={false} />
            </div>
          </div>

          <div className="signalement-right">
            <h2 className="signalement-title">Créer un nouveau signalement</h2>

            <input
              type="text"
              placeholder="Titre du signalement"
              className="input"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />

            <input
              type="text"
              placeholder="Catégorie"
              className="input"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
            />

            <textarea
              placeholder="Commentaires"
              className="textarea"
              value={commentaires}
              onChange={(e) => setCommentaires(e.target.value)}
            />

            <button onClick={handleSubmit} className="btn-signalement">
              Créer un signalement
            </button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>COPYRIGHT © 2025</p>
        <p>DESIGNED BY MALXHUS</p>
      </footer>
    </div>
  );
}