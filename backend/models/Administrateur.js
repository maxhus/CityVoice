const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Administrateur = sequelize.define('Administrateur', {
  id_admin: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom_admin: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  prenom_admin: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email_admin: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  mot_de_passe_admin: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  id_service: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'service_municipal',
      key: 'id_service'
    }
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: 'moderateur'
  }
}, {
  tableName: 'administrateur',
  timestamps: false
});

module.exports = Administrateur;
