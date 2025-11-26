import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import MapView from "../components/MapView";
import ReportCard from "../components/ReportCard";
import reportService from "../services/reportService";
import "./Home.css";

function Home() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
          category: "Infrastructure",
          status: "en cours",
          description: "Gros nid de poule dangereux pour les véhicules",
          time: "5 minutes passées",
          duration: "Depuis 1 heure",
          latitude: 48.8566,
          longitude: 2.3522,
          adresse: "15 Rue de Rivoli",
          quartier: "1er arrondissement"
        },
        {
          id_signalement: 2,
          title: "Poubelle débordante",
          category: "Propreté",
          status: "en cours",
          description: "Poubelle pleine non collectée depuis plusieurs jours",
          time: "10 minutes passées",
          duration: "Depuis 3 heures",
          latitude: 48.8606,
          longitude: 2.3376,
          adresse: "23 Avenue des Champs-Élysées",
          quartier: "8ème arrondissement"
        },
        {
          id_signalement: 3,
          title: "Lampadaire cassé",
          category: "Sécurité",
          status: "signalé",
          description: "Éclairage public défectueux depuis 2 jours",
          time: "1 heure passée",
          duration: "Depuis 2 jours",
          latitude: 48.8698,
          longitude: 2.3078,
          adresse: "42 Avenue Foch",
          quartier: "16ème arrondissement"
        },
        {
          id_signalement: 4,
          title: "Graffiti sur mur",
          category: "Propreté",
          status: "résolu",
          description: "Tag sur le mur du bâtiment municipal",
          time: "2 heures passées",
          duration: "Résolu aujourd'hui",
          latitude: 48.8534,
          longitude: 2.3488,
          adresse: "8 Place de la Bastille",
          quartier: "11ème arrondissement"
        },
        {
          id_signalement: 5,
          title: "Fuite d'eau",
          category: "Infrastructure",
          status: "en cours",
          description: "Fuite importante sur la voie publique",
          time: "30 minutes passées",
          duration: "Depuis 5 heures",
          latitude: 48.8584,
          longitude: 2.2945,
          adresse: "12 Avenue de la Grande Armée",
          quartier: "17ème arrondissement"
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

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  // Filtrer les signalements par recherche
  const filteredReports = reports.filter(report => 
    report.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <SearchBar onSearch={handleSearch} />

      <div className="home-content">
        <div className="map-section">
          <MapView reports={filteredReports} />
        </div>

        <div className="reports-section">
          <h2 className="reports-title">
            Signalements ({filteredReports.length})
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
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <ReportCard key={report.id_signalement} report={report} />
              ))
            ) : (
              <p style={{ textAlign: 'center', padding: '2rem' }}>
                {searchTerm ? 'Aucun signalement trouvé' : 'Aucun signalement disponible'}
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
