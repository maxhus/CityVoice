import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MapView from '../components/MapView';
import ReportCard from '../components/ReportCard';
import './Home.css';

function Home() {
  // Données de test
  const mockReports = [
    {
      id: 1,
      title: 'Nid de poule',
      category: 'Infrastructure',
      status: 'en cours',
      time: '5 minutes passées',
      duration: 'Depuis 1 heure',
      latitude: 48.8566,
      longitude: 2.3522
    },
    {
      id: 2,
      title: 'Poubelle débordante',
      category: 'Propreté',
      status: 'en cours',
      time: '5 minutes passées',
      duration: 'Depuis 1 heure',
      latitude: 48.8606,
      longitude: 2.3376
    },
    {
      id: 3,
      title: 'Lampadaire cassé',
      category: 'Sécurité',
      status: 'en cours',
      time: '5 minutes passées',
      duration: 'Depuis 1 heure',
      latitude: 48.8698,
      longitude: 2.3078
    }
  ];

  const handleSearch = (searchValue) => {
    console.log('Recherche:', searchValue);
    // TODO: Implémenter la recherche
  };

  return (
    <div className="home">
      <Header />
      <SearchBar onSearch={handleSearch} />
      
      <div className="home-content">
        <div className="map-section">
          <MapView reports={mockReports} />
        </div>
        
        <div className="reports-section">
          <h2 className="reports-title">Voirie.blabla</h2>
          <p className="reports-subtitle">date</p>
          <div className="reports-list">
            {mockReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>COPYRIGHT © ___2025___</p>
        <p>DESIGNED BY MALXHUS</p>
      </footer>
    </div>
  );
}

export default Home;