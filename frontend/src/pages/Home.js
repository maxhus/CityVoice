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
      const response = await reportService.getAllReports();
      
      if (response.success) {
        // Transformer les données pour correspondre au format attendu par les composants
        const transformedReports = response.data.map(report => ({
          id: report.id_signalement,
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
      }
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
                <ReportCard key={report.id} report={report} />
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
