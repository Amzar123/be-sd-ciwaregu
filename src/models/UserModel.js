import { Sequelize } from "sequelize";
import db from '../configs/db.config.js';
import PasswordValidator from "password-validator";

const { DataTypes } = Sequelize;

export const Users = db.define('users_auth', {
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
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

export const validatePassword = (userEmail, showDetails) => {
    const schema = new PasswordValidator();
    schema
    .is().min(6)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)    
    .has().not().spaces() 

    if(showDetails){
        return schema.validate(userEmail, {details: true});
    }else{
        return schema.validate(userEmail);
    }
}
