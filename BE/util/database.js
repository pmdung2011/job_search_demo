const mysql = require('mysql2');

require('dotenv').config();

const pool = mysql.createPool({
	host: process.env.SQL_SERVER,
	user: process.env.SQL_USERNAME,
	password: process.env.SQL_PASSWORD,
	database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
});

module.exports = pool.promise();