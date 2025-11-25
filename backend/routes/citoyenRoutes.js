const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
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
router.get('/profil/:id', authMiddleware, getProfil);
router.put('/profil/:id', authMiddleware, updateProfil);

module.exports = router;
