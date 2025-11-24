const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const HistoriqueStatut = sequelize.define('HistoriqueStatut', {
  id_historique: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ancien_statut: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  nouveau_statut: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  date_modification: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  id_signalement: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'signalement',
      key: 'id_signalement'
    }
  },
  id_admin: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'administrateur',
      key: 'id_admin'
    }
  }
}, {
  tableName: 'historiquestatut',
  timestamps: false
});

module.exports = HistoriqueStatut;
