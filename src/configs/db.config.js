/* const env = process.env;
const fs = require('fs');
const db = {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME || 'programming_languages',
    port: env.DB_PORT || 3306
}; */

import { Sequelize } from "sequelize";

const db = new Sequelize('db_sdciwaregu', 'root', '',{
    host: "localhost",
    dialect: "mysql"
});

export default db;
