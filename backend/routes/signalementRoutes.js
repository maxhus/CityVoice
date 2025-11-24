const express = require('express');
const router = express.Router();
const {
  getAllSignalements,
  getSignalementById,
  createSignalement,
  updateSignalement,
  deleteSignalement,
  getSignalementsByCitoyen,
  getStatistiques
} = require('../controllers/signalementController');

// Routes publiques
router.get('/', getAllSignalements);
router.get('/stats', getStatistiques);
router.get('/:id', getSignalementById);

// Routes protégées (nécessitent authentification)
// TODO: Ajouter middleware auth
router.post('/', createSignalement);
router.put('/:id', updateSignalement);
router.delete('/:id', deleteSignalement);
router.get('/citoyen/:id', getSignalementsByCitoyen);

module.exports = router;
