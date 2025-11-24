const { Citoyen } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Inscription d'un nouveau citoyen
// @route   POST /api/citoyens/inscription
// @access  Public
exports.inscription = async (req, res) => {
  try {
    const { nom_citoyen, prenom_citoyen, email_citoyen, mot_de_passe_citoyen } = req.body;

    // Validation
    if (!nom_citoyen || !prenom_citoyen || !email_citoyen || !mot_de_passe_citoyen) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir tous les champs requis'
      });
    }

    // Vérifier si l'email existe déjà
    const citoyenExistant = await Citoyen.findOne({ where: { email_citoyen } });
    if (citoyenExistant) {
      return res.status(400).json({
        success: false,
        message: 'Cet email est déjà utilisé'
      });
    }

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mot_de_passe_citoyen, salt);

    // Créer le citoyen
    const citoyen = await Citoyen.create({
      nom_citoyen,
      prenom_citoyen,
      email_citoyen,
      mot_de_passe_citoyen: hashedPassword
    });

    // Générer le token JWT
    const token = jwt.sign(
      { id: citoyen.id_citoyen, email: citoyen.email_citoyen },
      process.env.JWT_SECRET || 'secret_par_defaut',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Inscription réussie',
      token,
      data: {
        id_citoyen: citoyen.id_citoyen,
        nom_citoyen: citoyen.nom_citoyen,
        prenom_citoyen: citoyen.prenom_citoyen,
        email_citoyen: citoyen.email_citoyen
      }
    });
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription',
      error: error.message
    });
  }
};

// @desc    Connexion d'un citoyen
// @route   POST /api/citoyens/connexion
// @access  Public
exports.connexion = async (req, res) => {
  try {
    const { email_citoyen, mot_de_passe_citoyen } = req.body;

    // Validation
    if (!email_citoyen || !mot_de_passe_citoyen) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir email et mot de passe'
      });
    }

    // Trouver le citoyen
    const citoyen = await Citoyen.findOne({ where: { email_citoyen } });
    if (!citoyen) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(mot_de_passe_citoyen, citoyen.mot_de_passe_citoyen);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: citoyen.id_citoyen, email: citoyen.email_citoyen },
      process.env.JWT_SECRET || 'secret_par_defaut',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      success: true,
      message: 'Connexion réussie',
      token,
      data: {
        id_citoyen: citoyen.id_citoyen,
        nom_citoyen: citoyen.nom_citoyen,
        prenom_citoyen: citoyen.prenom_citoyen,
        email_citoyen: citoyen.email_citoyen
      }
    });
  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion',
      error: error.message
    });
  }
};

// @desc    Récupérer le profil d'un citoyen
// @route   GET /api/citoyens/profil/:id
// @access  Private
exports.getProfil = async (req, res) => {
  try {
    const citoyen = await Citoyen.findByPk(req.params.id, {
      attributes: { exclude: ['mot_de_passe_citoyen'] }
    });

    if (!citoyen) {
      return res.status(404).json({
        success: false,
        message: 'Citoyen non trouvé'
      });
    }

    res.json({
      success: true,
      data: citoyen
    });
  } catch (error) {
    console.error('Erreur getProfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du profil',
      error: error.message
    });
  }
};

// @desc    Mettre à jour le profil d'un citoyen
// @route   PUT /api/citoyens/profil/:id
// @access  Private
exports.updateProfil = async (req, res) => {
  try {
    const { nom_citoyen, prenom_citoyen, email_citoyen } = req.body;
    const citoyen = await Citoyen.findByPk(req.params.id);

    if (!citoyen) {
      return res.status(404).json({
        success: false,
        message: 'Citoyen non trouvé'
      });
    }

    // Mettre à jour les champs
    if (nom_citoyen) citoyen.nom_citoyen = nom_citoyen;
    if (prenom_citoyen) citoyen.prenom_citoyen = prenom_citoyen;
    if (email_citoyen) citoyen.email_citoyen = email_citoyen;

    await citoyen.save();

    res.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      data: {
        id_citoyen: citoyen.id_citoyen,
        nom_citoyen: citoyen.nom_citoyen,
        prenom_citoyen: citoyen.prenom_citoyen,
        email_citoyen: citoyen.email_citoyen
      }
    });
  } catch (error) {
    console.error('Erreur updateProfil:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du profil',
      error: error.message
    });
  }
};
