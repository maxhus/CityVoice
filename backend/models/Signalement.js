const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Signalement = sequelize.define('Signalement', {
  id_signalement: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  categorie: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  statut: {
    type: DataTypes.STRING(50),
    defaultValue: 'en_attente'
  },
  priorite: {
    type: DataTypes.STRING(20),
    defaultValue: 'normale'
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false
  },
  adresse: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  quartier: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  date_soumission: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  date_resolution: {
    type: DataTypes.DATE,
    allowNull: true
  },
  id_citoyen: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'citoyen',
      key: 'id_citoyen'
    }
  },
  id_admin_assigne: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'administrateur',
      key: 'id_admin'
    }
  },
  note_admin: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'signalement',
  timestamps: false
});

module.exports = Signalement;
