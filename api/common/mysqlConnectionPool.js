var mysql = require('mysql');
var config = require('./config');

module.exports = mysql.createPool({
    connectionLimit: 12500,
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});