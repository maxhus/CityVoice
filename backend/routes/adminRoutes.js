const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  loginAdmin,
  registerAdmin,
  getAdminProfile
} = require('../controllers/adminController');

// Routes publiques
router.post('/login', loginAdmin);

// Routes protégées
router.post('/register', authMiddleware, registerAdmin);
router.get('/profile', authMiddleware, getAdminProfile);

module.exports = router;
