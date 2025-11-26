import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour obtenir la géolocalisation de l'utilisateur
 */
const useGeoLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par votre navigateur');
      // Utiliser Bruxelles par défaut
      setLocation({
        latitude: 50.8503,
        longitude: 4.3517,
        accuracy: null
      });
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        // Utiliser Bruxelles par défaut en cas d'erreur
        setLocation({
          latitude: 50.8503,
          longitude: 4.3517,
          accuracy: null
        });
        setLoading(false);
      }
    );
  }, []);

  return { location, error, loading };
};

export default useGeoLocation;
