var mysql = require('mysql');
var config = require('./config');

module.exports = mysql.createPool({
    connectionLimit: 12500,
    host:'localhost',
    user:'root',
    password:'',
    database:'electric'
});
