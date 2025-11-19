const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// TODO: Importer les routes ici
// const signalementRoutes = require('./routes/signalementRoutes');
// app.use('/api/signalements', signalementRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API CityVoice' });
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
