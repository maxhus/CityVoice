// Index des modèles - Définit les relations entre les modèles
const { sequelize } = require('../config/db');
const Citoyen = require('./Citoyen');
const Signalement = require('./Signalement');
const Administrateur = require('./Administrateur');
const ServiceMunicipal = require('./ServiceMunicipal');
const Notification = require('./Notification');
const HistoriqueStatut = require('./HistoriqueStatut');
const Commentaire = require('./Commentaire');

// Relations Citoyen <-> Signalement
Citoyen.hasMany(Signalement, {
  foreignKey: 'id_citoyen',
  as: 'signalements'
});
Signalement.belongsTo(Citoyen, {
  foreignKey: 'id_citoyen',
  as: 'citoyen'
});

// Relations Citoyen <-> Notification
Citoyen.hasMany(Notification, {
  foreignKey: 'id_citoyen',
  as: 'notifications'
});
Notification.belongsTo(Citoyen, {
  foreignKey: 'id_citoyen',
  as: 'citoyen'
});

// Relations ServiceMunicipal <-> Administrateur
ServiceMunicipal.hasMany(Administrateur, {
  foreignKey: 'id_service',
  as: 'administrateurs'
});
Administrateur.belongsTo(ServiceMunicipal, {
  foreignKey: 'id_service',
  as: 'service'
});

// Relations Signalement <-> HistoriqueStatut
Signalement.hasMany(HistoriqueStatut, {
  foreignKey: 'id_signalement',
  as: 'historiques'
});
HistoriqueStatut.belongsTo(Signalement, {
  foreignKey: 'id_signalement',
  as: 'signalement'
});

// Relations Administrateur <-> HistoriqueStatut
Administrateur.hasMany(HistoriqueStatut, {
  foreignKey: 'id_admin',
  as: 'modifications'
});
HistoriqueStatut.belongsTo(Administrateur, {
  foreignKey: 'id_admin',
  as: 'administrateur'
});

// Relations Signalement <-> Commentaire
Signalement.hasMany(Commentaire, {
  foreignKey: 'id_signalement',
  as: 'commentaires'
});
Commentaire.belongsTo(Signalement, {
  foreignKey: 'id_signalement',
  as: 'signalement'
});

// Relations Citoyen <-> Commentaire
Citoyen.hasMany(Commentaire, {
  foreignKey: 'id_citoyen',
  as: 'commentaires'
});
Commentaire.belongsTo(Citoyen, {
  foreignKey: 'id_citoyen',
  as: 'citoyen'
});

// Relations Administrateur <-> Commentaire
Administrateur.hasMany(Commentaire, {
  foreignKey: 'id_admin',
  as: 'commentaires'
});
Commentaire.belongsTo(Administrateur, {
  foreignKey: 'id_admin',
  as: 'administrateur'
});

module.exports = {
  sequelize,
  Citoyen,
  Signalement,
  Administrateur,
  ServiceMunicipal,
  Notification,
  HistoriqueStatut,
  Commentaire
};
