import { DataTypes } from "sequelize";
import db from '../configs/db.config.js';

//programms attribute users schema
export const Awards = db.define("awards", {
    awardId:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    deskripsi:{
        type: DataTypes.TEXT
    },
    kategori:{
        type: DataTypes.STRING
    },
    tanggal: {
        type: DataTypes.DATE,
        allowNull: false
    },
    penerima: {
        type: DataTypes.DATE,
        allowNull: false
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