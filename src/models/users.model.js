import { Association, DataTypes } from 'sequelize';
import db from '../configs/db.config.js';

//Users attribute database schemaw
export const Users = db.define('users', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUrl:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    },
    birthDate:{
        type: DataTypes.TEXT
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
});