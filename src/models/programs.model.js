import { DataTypes } from "sequelize";
import db from '../configs/db.config.js';

//programms attribute users schema
export const Programs = db.define("programs", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING
    },
    goal:{
        type: DataTypes.STRING
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
},{
    freezeTableName: true
})