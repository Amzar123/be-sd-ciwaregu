import { DataTypes } from 'sequelize';
import db from '../configs/db.config.js';

// Galleries attribute database schema
export const Teachers = db.define('teachers', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    // allowNull: false,
    unique: true,
  },
  password:{
    type: DataTypes.STRING,
    // allowNull: false,
  },
  refresh_token:{
    type: DataTypes.TEXT,
    // allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  position: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
}, {
  freezeTableName: true
});
