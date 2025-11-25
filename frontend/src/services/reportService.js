import api from '../config/api';

// Service pour les signalements
const reportService = {
  // Créer un nouveau signalement
  createReport: async (reportData) => {
    const response = await api.post('/signalements', reportData);
    return response.data;
  },

  // Obtenir tous les signalements
  getAllReports: async (filters = {}) => {
    const response = await api.get('/signalements', { params: filters });
    return response.data;
  },

  // Obtenir un signalement par ID
  getReportById: async (id) => {
    const response = await api.get(`/signalements/${id}`);
    return response.data;
  },

  // Mettre à jour un signalement
  updateReport: async (id, updates) => {
    const response = await api.put(`/signalements/${id}`, updates);
    return response.data;
  },

  // Supprimer un signalement
  deleteReport: async (id) => {
    const response = await api.delete(`/signalements/${id}`);
    return response.data;
  },

  // Voter pour un signalement
  voteReport: async (id) => {
    const response = await api.post(`/signalements/${id}/vote`);
    return response.data;
  },

  // Upload d'image
  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/signalements/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};

export default reportService;
