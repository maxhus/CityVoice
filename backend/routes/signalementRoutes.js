const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
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
router.post('/', authMiddleware, createSignalement);
router.put('/:id', authMiddleware, updateSignalement);
router.delete('/:id', authMiddleware, deleteSignalement);
router.get('/citoyen/:id', authMiddleware, getSignalementsByCitoyen);

module.exports = router;
