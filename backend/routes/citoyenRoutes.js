const express = require('express');
const router = express.Router();
const {
  inscription,
  connexion,
  getProfil,
  updateProfil
} = require('../controllers/citoyenController');

// Routes publiques
router.post('/inscription', inscription);
router.post('/connexion', connexion);

// Routes protégées (nécessitent authentification)
// TODO: Ajouter middleware auth
router.get('/profil/:id', getProfil);
router.put('/profil/:id', updateProfil);

module.exports = router;
