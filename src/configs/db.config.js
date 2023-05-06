// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'be-sd-ciwaregu',
//   password: 'arz140701',
//   port: 5432 // the default PostgreSQL port
// })

// module.exports = pool;

const Sequelize = require('sequelize');

const db = new Sequelize('be-sd-ciwaregu', 'postgres', 'arz140701', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = db;