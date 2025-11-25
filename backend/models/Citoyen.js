const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Citoyen = sequelize.define('Citoyen', {
  id_citoyen: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom_citoyen: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'nom_citoyen'
  },
  prenom_citoyen: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'prenom_citoyen'
  },
  email_citoyen: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    field: 'email_citoyen',
    validate: {
      isEmail: true
    }
  },
  mot_de_passe_citoyen: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'mot_de_passe_citoyen'
  }
}, {
  tableName: 'citoyen',
  timestamps: false,
  // Créer des getters virtuels pour compatibilité
  getterMethods: {
    nom() {
      return this.getDataValue('nom_citoyen');
    },
    prenom() {
      return this.getDataValue('prenom_citoyen');
    },
    email() {
      return this.getDataValue('email_citoyen');
    }
  }
});

module.exports = Citoyen;
