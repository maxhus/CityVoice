const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Commentaire = sequelize.define('Commentaire', {
  id_commentaire: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_signalement: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'signalement',
      key: 'id_signalement'
    }
  },
  id_citoyen: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'citoyen',
      key: 'id_citoyen'
    }
  },
  id_admin: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'administrateur',
      key: 'id_admin'
    }
  },
  texte: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'commentaires',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Commentaire;
