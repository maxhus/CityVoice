import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

const MapView = ({ reports = [] }) => {
  const [center] = useState([48.8566, 2.3522]); // Paris par défaut
  const [zoom] = useState(13);

  return (
    <div className="map-container">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {reports.map((report, index) => (
          <Marker 
            key={index} 
            position={[report.latitude || 48.8566, report.longitude || 2.3522]}
          >
            <Popup>
              <strong>{report.title || 'Signalement'}</strong><br />
              {report.category || 'Catégorie inconnue'}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <button className="new-report-btn">
        new report
      </button>
    </div>
  );
};

export default MapView;
