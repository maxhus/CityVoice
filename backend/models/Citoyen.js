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
    allowNull: false
  },
  prenom_citoyen: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email_citoyen: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  mot_de_passe_citoyen: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'citoyen',
  timestamps: false
});

module.exports = Citoyen;
