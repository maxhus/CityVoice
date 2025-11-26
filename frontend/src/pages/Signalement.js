import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import MapView from "../components/MapView";
import reportService from "../services/reportService";
import useGeoLocation from "../hooks/useGeoLocation";
import { useAuth } from "../context/AuthContext";
import "./Signalement.css";

export default function Signalement() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const location = useGeoLocation();

  const [recherche, setRecherche] = useState("");
  const [titre, setTitre] = useState("");
  const [categorie, setCategorie] = useState("");
  const [description, setDescription] = useState("");
  const [adresse, setAdresse] = useState("");
  const [quartier, setQuartier] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState(null);

  // Catégories disponibles
  const categories = [
    "Voirie",
    "Propreté",
    "Éclairage public",
    "Espaces verts",
    "Transport",
    "Mobilier urbain",
    "Bâtiments publics",
    "Eau et assainissement",
    "Sécurité",
    "Autre"
  ];

  // Remplir automatiquement la géolocalisation
  useEffect(() => {
    if (location.loaded && !location.error) {
      setLatitude(location.coordinates.lat.toString());
      setLongitude(location.coordinates.lng.toString());
    }
  }, [location]);

  // Vérifier l'authentification (attendre que le chargement soit terminé)
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      alert("Vous devez être connecté pour créer un signalement");
      navigate("/connexion");
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleAddressSearch = async () => {
    if (!recherche.trim()) {
      alert("Veuillez entrer une adresse");
      return;
    }

    setSearchLoading(true);
    try {
      // Utiliser l'API Nominatim d'OpenStreetMap pour le géocodage
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(recherche)}&countrycodes=be&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);
        
        setLatitude(result.lat);
        setLongitude(result.lon);
        setAdresse(result.display_name);
        setMapCenter([lat, lon]); // Recentrer la carte
        
        // Extraire le quartier si possible
        if (result.address) {
          const quartierPossible = result.address.suburb || result.address.neighbourhood || result.address.quarter || "";
          if (quartierPossible) {
            setQuartier(quartierPossible);
          }
        }
        
        alert("Adresse trouvée et localisée sur la carte !");
      } else {
        alert("Adresse non trouvée. Veuillez vérifier l'orthographe.");
      }
    } catch (err) {
      console.error("Erreur lors de la recherche d'adresse:", err);
      alert("Erreur lors de la recherche d'adresse");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!titre.trim()) {
      setError("Le titre est obligatoire");
      return;
    }
    if (!categorie) {
      setError("Veuillez sélectionner une catégorie");
      return;
    }
    if (!description.trim()) {
      setError("La description est obligatoire");
      return;
    }

    try {
      setLoading(true);

      // Si la géolocalisation n'est pas disponible ou pas encore chargée,
      // utiliser des coordonnées par défaut (Bruxelles centre - Grand-Place)
      const lat = latitude ? parseFloat(latitude) : 50.8503;
      const lng = longitude ? parseFloat(longitude) : 4.3517;

      const signalementData = {
        titre: titre.trim(),
        description: description.trim(),
        categorie,
        latitude: lat,
        longitude: lng,
        adresse: adresse.trim() || "Non renseignée",
        quartier: quartier.trim() || "Non renseigné",
        id_citoyen: user.id_citoyen
      };

      const response = await reportService.createReport(signalementData);

      if (response.success) {
        alert("Signalement créé avec succès !");
        // Réinitialiser le formulaire
        setTitre("");
        setCategorie("");
        setDescription("");
        setAdresse("");
        setQuartier("");
        setRecherche("");
        // Rediriger vers la page d'accueil
        navigate("/");
      } else {
        setError(response.message || "Erreur lors de la création du signalement");
      }
    } catch (err) {
      console.error("Erreur lors de la création du signalement:", err);
      setError(err.response?.data?.message || "Erreur lors de la création du signalement");
    } finally {
      setLoading(false);
    }
  };

  const mockReports = [];

  // Afficher un loader pendant le chargement de l'authentification
  if (authLoading) {
    return (
      <div className="signalement-page">
        <Header />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="signalement-page">
      <Header />

      <div className="signalement-container">
        <div className="signalement-box">
          <div className="signalement-left">
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Recherche adresse (ex: Boulevard Saint Michel, 49, Bruxelles)"
                className="search-input"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddressSearch()}
                style={{ flex: 1 }}
              />
              <button
                onClick={handleAddressSearch}
                disabled={searchLoading}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: searchLoading ? 'not-allowed' : 'pointer',
                  fontWeight: '500',
                  opacity: searchLoading ? 0.6 : 1
                }}
              >
                {searchLoading ? '🔍...' : '🔍 Rechercher'}
              </button>
            </div>

            <div className="map-wrapper">
              <MapView 
                reports={latitude && longitude ? [{
                  id_signalement: 'temp',
                  title: 'Position sélectionnée',
                  category: categorie || 'Non défini',
                  latitude: parseFloat(latitude),
                  longitude: parseFloat(longitude),
                  adresse: adresse || 'Position actuelle'
                }] : []} 
                showNewReportButton={false}
                center={mapCenter}
              />
            </div>

            <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
              {location.loaded && !location.error && (
                <p style={{ color: 'green', margin: 0 }}>
                  ✓ Position géographique détectée automatiquement
                </p>
              )}
            </div>
          </div>

          <div className="signalement-right">
            <h2 className="signalement-title">Créer un nouveau signalement</h2>

            {error && (
              <div style={{ 
                padding: '0.75rem', 
                marginBottom: '1rem', 
                backgroundColor: '#fee', 
                color: '#c00',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}

            <input
              type="text"
              placeholder="Titre du signalement *"
              className="input"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              required
            />

            <select
              className="input"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              required
              style={{ padding: '0.75rem', fontSize: '1rem' }}
            >
              <option value="">Sélectionnez une catégorie *</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <textarea
              placeholder="Description détaillée du problème *"
              className="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
            />

            <input
              type="text"
              placeholder="Adresse"
              className="input"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
            />

            <input
              type="text"
              placeholder="Quartier"
              className="input"
              value={quartier}
              onChange={(e) => setQuartier(e.target.value)}
            />

            <button 
              onClick={handleSubmit} 
              className="btn-signalement"
              disabled={loading}
              style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? "Création en cours..." : "Créer le signalement"}
            </button>

            <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
              * Champs obligatoires : Titre, Catégorie et Description
            </p>
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
