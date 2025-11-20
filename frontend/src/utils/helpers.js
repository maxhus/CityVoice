/**
 * Formater une date en format lisible
 * @param {string|Date} date - Date à formater
 * @returns {string} Date formatée
 */
export const formatDate = (date) => {
  const d = new Date(date);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return d.toLocaleDateString('fr-FR', options);
};

/**
 * Calculer le temps écoulé depuis une date
 * @param {string|Date} date - Date de référence
 * @returns {string} Temps écoulé
 */
export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' ans';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' mois';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' jours';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' heures';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes';
  
  return Math.floor(seconds) + ' secondes';
};

/**
 * Valider une adresse email
 * @param {string} email - Email à valider
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Tronquer un texte
 * @param {string} text - Texte à tronquer
 * @param {number} maxLength - Longueur maximale
 * @returns {string}
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};
