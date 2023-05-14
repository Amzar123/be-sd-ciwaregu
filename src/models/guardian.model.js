import { DataTypes } from 'sequelize';
import db from '../configs/db.config.js';

// Galleries attribute database schema
export const Guardian = db.define('guardians', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
      candidateId: {
        allowNull: true,
        type: DataTypes.STRING
      },
      nama: {
        allowNull: true,
        type: DataTypes.STRING
      },
      pendidikan: {
        allowNull: false,
        type: DataTypes.STRING
      },
      pekerjaan: {
        allowNull: false,
        type: DataTypes.STRING
      },
      penghasilan: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
