const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connexion à la base de données
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importer les routes
const signalementRoutes = require('./routes/signalementRoutes');
const citoyenRoutes = require('./routes/citoyenRoutes');
const commentaireRoutes = require('./routes/commentaireRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Routes API
app.use('/api/signalements', signalementRoutes);
app.use('/api/citoyens', citoyenRoutes);
app.use('/api/commentaires', commentaireRoutes);
app.use('/api/admin', adminRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenue sur l\'API CityVoice',
    version: '1.0.0',
    endpoints: {
      signalements: '/api/signalements',
      citoyens: '/api/citoyens',
      commentaires: '/api/commentaires',
      admin: '/api/admin'
    }
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Une erreur s\'est produite!',
    message: err.message 
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});

module.exports = app;
