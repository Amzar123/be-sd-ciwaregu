// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'be-sd-ciwaregu',
//   password: 'arz140701',
//   port: 5432 // the default PostgreSQL port
// })

// module.exports = pool;

import { Sequelize } from "sequelize";

const db = new Sequelize('be-sd-ciwaregu', 'postgres', 'arz140701', {
  host: 'localhost',
  dialect: 'postgres'
});

// import { Sequelize } from "sequelize";

// const db = new Sequelize('db_sdciwaregu', 'root', '',{
//     host: "localhost",
//     dialect: "mysql"
// });

export default db;
