const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ServiceMunicipal = sequelize.define('ServiceMunicipal', {
  id_service: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom_service: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'service_municipal',
  timestamps: false
});

module.exports = ServiceMunicipal;
