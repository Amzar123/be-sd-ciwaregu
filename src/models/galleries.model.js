<<<<<<< HEAD
import { DataTypes } from 'sequelize';
import db from '../configs/db.config.js';

// Galleries attribute database schema
export const Galleries = db.define('galleries', {
=======
const DataTypes = require('sequelize');
const db = require('../configs/db.config');

// Galleries attribute database schema
const Galleries = db.define('galleries', {
>>>>>>> 3f3f67cb42224836063fbe4844fe383125a4441f
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
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
<<<<<<< HEAD
=======

module.exports = Galleries
>>>>>>> 3f3f67cb42224836063fbe4844fe383125a4441f
