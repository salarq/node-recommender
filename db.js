const mysql = require('mysql2');

const pool = mysql.createPool({ host: 'localhost', user: 'root', password: '', database: 'pricecom' });
const promisePool = pool.promise();

module.exports = promisePool;