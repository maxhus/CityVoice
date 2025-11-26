import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapView.css';

// Fix pour les icônes Leaflet avec React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Composant pour mettre à jour le centre de la carte
function ChangeMapView({ center }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, 15, { animate: true });
    }
  }, [center, map]);
  
  return null;
}

const MapView = ({ reports = [], showNewReportButton = true, center: customCenter = null }) => {
  const navigate = useNavigate();
  const defaultCenter = [50.8503, 4.3517]; // Bruxelles par défaut
  const center = customCenter || defaultCenter;
  const [zoom] = useState(13);

  // Limites géographiques de la Belgique
  const belgiumBounds = [
    [49.5, 2.5],  // Sud-Ouest
    [51.5, 6.4]   // Nord-Est
  ];

  // Debug: afficher les rapports reçus
  console.log('MapView - Nombre de rapports:', reports.length);
  console.log('MapView - Rapports:', reports);

  return (
    <div className="map-container">
      <MapContainer 
        center={defaultCenter} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        maxBounds={belgiumBounds}
        maxBoundsViscosity={1.0}
        minZoom={8}
        maxZoom={18}
      >
        <ChangeMapView center={customCenter} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {reports && reports.length > 0 ? (
          reports.map((report, index) => {
            const lat = parseFloat(report.latitude);
            const lng = parseFloat(report.longitude);
            
            // Vérifier que les coordonnées sont valides
            if (!isNaN(lat) && !isNaN(lng)) {
              console.log(`Marqueur ${index}:`, report.title, `[${lat}, ${lng}]`);
              return (
                <Marker 
                  key={report.id_signalement || index} 
                  position={[lat, lng]}
                >
                  <Popup>
                    <strong>{report.title || 'Signalement'}</strong><br />
                    {report.category || 'Catégorie inconnue'}<br />
                    <small>{report.adresse || ''}</small>
                  </Popup>
                </Marker>
              );
            } else {
              console.warn(`Coordonnées invalides pour le rapport ${index}:`, report);
              return null;
            }
          })
        ) : (
          <Marker position={center}>
            <Popup>Bruxelles - Centre</Popup>
          </Marker>
        )}
      </MapContainer>

      {showNewReportButton && (
        <button className="new-report-btn" onClick={() => navigate('/signalement')}>
          ✏️ Nouveau signalement
        </button>
      )}
    </div>
  );
};

export default MapView;
