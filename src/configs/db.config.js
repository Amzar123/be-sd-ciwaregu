const Pool = require("pg").Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'be-sd-ciwaregu',
  password: 'arz140701',
  port: 5432 // the default PostgreSQL port
})

module.exports = pool;