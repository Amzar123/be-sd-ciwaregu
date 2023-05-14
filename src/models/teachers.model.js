import { DataTypes } from 'sequelize';
import db from '../configs/db.config.js';
import { Users } from './users.model.js';


// Galleries attribute database schema
export const Teachers = db.define('teachers', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  nuptk: {
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

// Define association between Teachers and Users
Teachers.belongsTo(Users, { foreignKey: 'userId' });