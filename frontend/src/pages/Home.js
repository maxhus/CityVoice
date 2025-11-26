import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import MapView from "../components/MapView";
import ReportCard from "../components/ReportCard";
import reportService from "../services/reportService";
import "./Home.css";

function Home() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      
      // Essayer de charger depuis l'API
      try {
        const response = await reportService.getAllReports();
        
        if (response.success) {
          // Transformer les données pour correspondre au format attendu par les composants
          const transformedReports = response.data.map(report => ({
            id_signalement: report.id_signalement,
            title: report.titre,
            category: report.categorie,
            status: report.statut,
            description: report.description,
            latitude: parseFloat(report.latitude),
            longitude: parseFloat(report.longitude),
            adresse: report.adresse,
            quartier: report.quartier,
            date_soumission: report.date_soumission,
            priorite: report.priorite
          }));
          setReports(transformedReports);
          setError(null);
          return;
        }
      } catch (apiError) {
        console.warn("API non disponible, utilisation des données mockées:", apiError);
      }
      
      // Données mockées si l'API n'est pas disponible
      const mockReports = [
        {
          id_signalement: 1,
          title: "Nid de poule",
          category: "Voirie",
          status: "en cours",
          description: "Gros nid de poule dangereux pour les véhicules",
          time: "5 minutes passées",
          duration: "Depuis 1 heure",
          latitude: 50.8503,
          longitude: 4.3517,
          adresse: "Boulevard Anspach, 1000 Bruxelles",
          quartier: "Centre"
        },
        {
          id_signalement: 2,
          title: "Poubelle débordante",
          category: "Propreté",
          status: "en cours",
          description: "Poubelle pleine non collectée depuis plusieurs jours",
          time: "10 minutes passées",
          duration: "Depuis 3 heures",
          latitude: 50.8467,
          longitude: 4.3525,
          adresse: "Place de la Bourse, 1000 Bruxelles",
          quartier: "Centre"
        },
        {
          id_signalement: 3,
          title: "Lampadaire cassé",
          category: "Éclairage",
          status: "signalé",
          description: "Éclairage public défectueux depuis 2 jours",
          time: "1 heure passée",
          duration: "Depuis 2 jours",
          latitude: 50.8429,
          longitude: 4.3618,
          adresse: "Avenue Louise, 1050 Ixelles",
          quartier: "Ixelles"
        },
        {
          id_signalement: 4,
          title: "Graffiti sur mur",
          category: "Propreté",
          status: "résolu",
          description: "Tag sur le mur du bâtiment municipal",
          time: "2 heures passées",
          duration: "Résolu aujourd'hui",
          latitude: 50.8371,
          longitude: 4.3676,
          adresse: "Chaussée d'Ixelles, 1050 Ixelles",
          quartier: "Ixelles"
        },
        {
          id_signalement: 5,
          title: "Fuite d'eau",
          category: "Voirie",
          status: "en cours",
          description: "Fuite importante sur la voie publique",
          time: "30 minutes passées",
          duration: "Depuis 5 heures",
          latitude: 50.8548,
          longitude: 4.3452,
          adresse: "Rue Neuve, 1000 Bruxelles",
          quartier: "Centre"
        }
      ];
      
      setReports(mockReports);
      setError(null);
    } catch (err) {
      console.error("Erreur lors du chargement des signalements:", err);
      setError("Impossible de charger les signalements");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="home">
        <Header />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Chargement des signalements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <Header />
        <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
          <p>{error}</p>
          <button onClick={loadReports}>Réessayer</button>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <Header />

      <div className="home-content">
        <div className="map-section">
          <MapView reports={reports} />
        </div>

        <div className="reports-section">
          <h2 className="reports-title">
            Signalements ({reports.length})
          </h2>
          <p className="reports-subtitle">
            {new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <div className="reports-list">
            {reports.length > 0 ? (
              reports.map((report) => (
                <ReportCard key={report.id_signalement} report={report} />
              ))
            ) : (
              <p style={{ textAlign: 'center', padding: '2rem' }}>
                Aucun signalement disponible
              </p>
            )}
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

export default Home;
