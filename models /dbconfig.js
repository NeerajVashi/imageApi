/* eslint-disable no-tabs */

require('dotenv').config();

const sqlConfig = {
	host: process.env.DB_HOST,
	user: process.env.USER_HERE,
	password: process.env.DB_PASS,
	database: process.env.db,
	connectionLimit: 10,
	queueLimit: 0,
};

module.exports = sqlConfig;


