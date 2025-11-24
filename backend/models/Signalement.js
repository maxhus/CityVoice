const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Signalement = sequelize.define('Signalement', {
  id_signalement: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  categorie: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  date_soumission: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  statut: {
    type: DataTypes.STRING(50),
    defaultValue: 'Nouveau'
  },
  id_citoyen: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'citoyen',
      key: 'id_citoyen'
    }
  }
}, {
  tableName: 'signalement',
  timestamps: false
});

module.exports = Signalement;
