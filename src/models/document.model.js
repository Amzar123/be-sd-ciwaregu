import { DataTypes } from 'sequelize';
import db from '../configs/db.config.js';
import { Candidate } from './candidate.model.js'; 

// Galleries attribute database schema
export const Document = db.define('documents', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    pasFotoUrl: {
      type: DataTypes.STRING
    },
    pasFotoFilename: {
      type: DataTypes.STRING
    },
    aktaUrl: {
      type: DataTypes.STRING
    },
    kkUrl: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
}, {
    freezeTableName: true
});

// Define association between Teachers and Users
Document.belongsTo(Candidate, { 
  foreignKey: 'candidateId', 
  as: 'documentCandidate', 
  onDelete: 'CASCADE' 
});