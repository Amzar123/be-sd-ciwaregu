import { DataTypes } from 'sequelize';
import db from '../configs/db.config.js';

// Galleries attribute database schema
export const Document = db.define('Documents', {
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
      jenis: {
        allowNull: false,
        type: DataTypes.STRING
      },
      ukuran: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING,
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
