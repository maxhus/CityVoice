const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaireController');
const authMiddleware = require('../middleware/auth');

// Récupérer tous les commentaires d'un signalement
router.get('/signalement/:id_signalement', commentaireController.getCommentairesBySignalement);

// Créer un commentaire (nécessite authentification)
router.post('/', authMiddleware, commentaireController.createCommentaire);

// Supprimer un commentaire (nécessite authentification)
router.delete('/:id_commentaire', authMiddleware, commentaireController.deleteCommentaire);

module.exports = router;
