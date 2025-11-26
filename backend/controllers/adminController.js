const { Administrateur, ServiceMunicipal } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Connexion administrateur
// @route   POST /api/admin/login
// @access  Public
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe requis'
      });
    }

    // Vérifier que l'email se termine par @cityvoice.be
    if (!email.endsWith('@cityvoice.be')) {
      return res.status(403).json({
        success: false,
        message: 'Accès réservé aux administrateurs CityVoice (@cityvoice.be)'
      });
    }

    // Chercher l'administrateur
    const admin = await Administrateur.findOne({
      where: { email_admin: email },
      include: [{
        model: ServiceMunicipal,
        as: 'service',
        attributes: ['id_service', 'nom_service']
      }]
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, admin.mot_de_passe_admin);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Générer le token JWT
    const token = jwt.sign(
      { 
        id: admin.id_admin, 
        email: admin.email_admin,
        role: 'admin',
        service: admin.id_service
      },
      process.env.JWT_SECRET || 'secret_par_defaut',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      success: true,
      token,
      data: {
        id_admin: admin.id_admin,
        nom: admin.nom_admin,
        prenom: admin.prenom_admin,
        email: admin.email_admin,
        role: admin.role,
        service: admin.service
      }
    });
  } catch (error) {
    console.error('Erreur connexion admin:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion',
      error: error.message
    });
  }
};

// @desc    Créer un administrateur
// @route   POST /api/admin/register
// @access  Private (Admin uniquement)
exports.registerAdmin = async (req, res) => {
  try {
    const { nom, prenom, email, password, role, id_service } = req.body;

    // Validation
    if (!nom || !prenom || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont requis'
      });
    }

    // Vérifier que l'email se termine par @cityvoice.be
    if (!email.endsWith('@cityvoice.be')) {
      return res.status(403).json({
        success: false,
        message: 'L\'email doit se terminer par @cityvoice.be'
      });
    }

    // Vérifier si l'email existe déjà
    const existingAdmin = await Administrateur.findOne({
      where: { email_admin: email }
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Un administrateur avec cet email existe déjà'
      });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'administrateur
    const admin = await Administrateur.create({
      nom_admin: nom,
      prenom_admin: prenom,
      email_admin: email,
      mot_de_passe_admin: hashedPassword,
      role: role || 'moderateur',
      id_service: id_service || null
    });

    res.status(201).json({
      success: true,
      message: 'Administrateur créé avec succès',
      data: {
        id_admin: admin.id_admin,
        nom: admin.nom_admin,
        prenom: admin.prenom_admin,
        email: admin.email_admin,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Erreur création admin:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de l\'administrateur',
      error: error.message
    });
  }
};

// @desc    Récupérer le profil admin
// @route   GET /api/admin/profile
// @access  Private (Admin)
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Administrateur.findByPk(req.user.id, {
      include: [{
        model: ServiceMunicipal,
        as: 'service',
        attributes: ['id_service', 'nom_service', 'description']
      }],
      attributes: { exclude: ['mot_de_passe_admin'] }
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Administrateur non trouvé'
      });
    }

    res.json({
      success: true,
      data: admin
    });
  } catch (error) {
    console.error('Erreur récupération profil admin:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};
