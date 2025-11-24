const { Signalement, Citoyen, HistoriqueStatut, sequelize } = require('../models');
const { Op } = require('sequelize');

// @desc    Récupérer tous les signalements
// @route   GET /api/signalements
// @access  Public
exports.getAllSignalements = async (req, res) => {
  try {
    const { categorie, statut, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Filtres
    const where = {};
    if (categorie) where.categorie = categorie;
    if (statut) where.statut = statut;

    const signalements = await Signalement.findAndCountAll({
      where,
      include: [{
        model: Citoyen,
        as: 'citoyen',
        attributes: ['id_citoyen', 'nom_citoyen', 'prenom_citoyen']
      }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['date_soumission', 'DESC']]
    });

    res.json({
      success: true,
      count: signalements.count,
      page: parseInt(page),
      totalPages: Math.ceil(signalements.count / limit),
      data: signalements.rows
    });
  } catch (error) {
    console.error('Erreur getAllSignalements:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des signalements',
      error: error.message
    });
  }
};

// @desc    Récupérer un signalement par ID
// @route   GET /api/signalements/:id
// @access  Public
exports.getSignalementById = async (req, res) => {
  try {
    const signalement = await Signalement.findByPk(req.params.id, {
      include: [
        {
          model: Citoyen,
          as: 'citoyen',
          attributes: ['id_citoyen', 'nom_citoyen', 'prenom_citoyen', 'email_citoyen']
        },
        {
          model: HistoriqueStatut,
          as: 'historiques',
          order: [['date_modification', 'DESC']]
        }
      ]
    });

    if (!signalement) {
      return res.status(404).json({
        success: false,
        message: 'Signalement non trouvé'
      });
    }

    res.json({
      success: true,
      data: signalement
    });
  } catch (error) {
    console.error('Erreur getSignalementById:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du signalement',
      error: error.message
    });
  }
};

// @desc    Créer un nouveau signalement
// @route   POST /api/signalements
// @access  Private (authentifié)
exports.createSignalement = async (req, res) => {
  try {
    const { description, categorie, id_citoyen } = req.body;

    // Validation
    if (!description || !categorie || !id_citoyen) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir tous les champs requis'
      });
    }

    // Vérifier que le citoyen existe
    const citoyen = await Citoyen.findByPk(id_citoyen);
    if (!citoyen) {
      return res.status(404).json({
        success: false,
        message: 'Citoyen non trouvé'
      });
    }

    const signalement = await Signalement.create({
      description,
      categorie,
      id_citoyen,
      statut: 'Nouveau'
    });

    // Créer l'historique initial
    await HistoriqueStatut.create({
      nouveau_statut: 'Nouveau',
      id_signalement: signalement.id_signalement,
      ancien_statut: null,
      id_admin: null
    });

    res.status(201).json({
      success: true,
      message: 'Signalement créé avec succès',
      data: signalement
    });
  } catch (error) {
    console.error('Erreur createSignalement:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du signalement',
      error: error.message
    });
  }
};

// @desc    Mettre à jour un signalement
// @route   PUT /api/signalements/:id
// @access  Private (admin)
exports.updateSignalement = async (req, res) => {
  try {
    const { statut, id_admin } = req.body;
    const signalement = await Signalement.findByPk(req.params.id);

    if (!signalement) {
      return res.status(404).json({
        success: false,
        message: 'Signalement non trouvé'
      });
    }

    const ancienStatut = signalement.statut;

    // Mettre à jour le statut
    if (statut) {
      signalement.statut = statut;
      await signalement.save();

      // Ajouter à l'historique
      await HistoriqueStatut.create({
        ancien_statut: ancienStatut,
        nouveau_statut: statut,
        id_signalement: signalement.id_signalement,
        id_admin: id_admin || null
      });
    }

    res.json({
      success: true,
      message: 'Signalement mis à jour avec succès',
      data: signalement
    });
  } catch (error) {
    console.error('Erreur updateSignalement:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du signalement',
      error: error.message
    });
  }
};

// @desc    Supprimer un signalement
// @route   DELETE /api/signalements/:id
// @access  Private (admin ou créateur)
exports.deleteSignalement = async (req, res) => {
  try {
    const signalement = await Signalement.findByPk(req.params.id);

    if (!signalement) {
      return res.status(404).json({
        success: false,
        message: 'Signalement non trouvé'
      });
    }

    await signalement.destroy();

    res.json({
      success: true,
      message: 'Signalement supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur deleteSignalement:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du signalement',
      error: error.message
    });
  }
};

// @desc    Récupérer les signalements d'un citoyen
// @route   GET /api/signalements/citoyen/:id
// @access  Private
exports.getSignalementsByCitoyen = async (req, res) => {
  try {
    const signalements = await Signalement.findAll({
      where: { id_citoyen: req.params.id },
      order: [['date_soumission', 'DESC']],
      include: [{
        model: HistoriqueStatut,
        as: 'historiques'
      }]
    });

    res.json({
      success: true,
      count: signalements.length,
      data: signalements
    });
  } catch (error) {
    console.error('Erreur getSignalementsByCitoyen:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des signalements',
      error: error.message
    });
  }
};

// @desc    Récupérer les statistiques des signalements
// @route   GET /api/signalements/stats
// @access  Public
exports.getStatistiques = async (req, res) => {
  try {
    const total = await Signalement.count();
    const parStatut = await Signalement.findAll({
      attributes: ['statut', [sequelize.fn('COUNT', sequelize.col('id_signalement')), 'count']],
      group: ['statut']
    });
    const parCategorie = await Signalement.findAll({
      attributes: ['categorie', [sequelize.fn('COUNT', sequelize.col('id_signalement')), 'count']],
      group: ['categorie']
    });

    res.json({
      success: true,
      data: {
        total,
        parStatut,
        parCategorie
      }
    });
  } catch (error) {
    console.error('Erreur getStatistiques:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques',
      error: error.message
    });
  }
};
