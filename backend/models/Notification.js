const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Notification = sequelize.define('Notification', {
  id_notification: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  message: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  date_notification: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  lue: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
  tableName: 'notification',
  timestamps: false
});

module.exports = Notification;
