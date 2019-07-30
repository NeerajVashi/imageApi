import mysql from 'mysql2/promise';
import sqlConfig from './dbconfig';

const pool = mysql.createPool(sqlConfig);
module.exports = pool;
