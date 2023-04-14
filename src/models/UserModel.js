import { Sequelize } from "sequelize";
import db from '../configs/db.config.js';

const { DataTypes } = Sequelize;

const Users = db.define('users_auth', {
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
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


export default Users;
