/* eslint-disable no-console */
/* eslint-disable no-tabs */

const mysql = require('mysql2/promise');

require('dotenv').config();


const sqlConfig = {
	host: process.env.DB_HOST,
	user: process.env.USER_HERE,
	password: process.env.DB_PASS,
	connectionLimit: 10,
	queueLimit: 0,
};
const pool1 = mysql.createPool(sqlConfig);

pool1.getConnection(function (error, connection) {

	console.log(error);

});
async function createDatabase() {
    await pool1.execute(`create database IF NOT EXISTS ${process.env.db}`);
	await console.log('created');
}

const sqlConfig1 = {
	host: process.env.DB_HOST,
	user: process.env.USER_HERE,
	password: process.env.DB_PASS,
	database: process.env.db,
	connectionLimit: 10,
	queueLimit: 0,
};
const pool = mysql.createPool(sqlConfig1);

async function deleteTable() {
	await pool.query(' DROP TABLE IF EXISTS userImage ');
}

async function createTable() {
    await pool.execute('CREATE TABLE userImage (`id` INT NOT NULL AUTO_INCREMENT,`userId` INT NOT NULL,`path` VARCHAR(50000) NOT NULL,`postId` INT ,PRIMARY KEY (`id`))');
	await console.log('created');
}
async function createTable1() {
    await pool.execute('CREATE TABLE `userAlbums` (`id` INT NOT NULL AUTO_INCREMENT,`userId` INT NOT NULL,`albumname` VARCHAR(450) NOT NULL DEFAULT `myalbum`,`path` VARCHAR(50000) NOT NULL,PRIMARY KEY (`id`))');
	await console.log('created');
}

async function script() {
	await createDatabase();
	await deleteTable();
	await createTable();
	await createTable1();
	
}
script();
module.exports = script;
