var mysql = require('mysql');
var config = require('./config');

module.exports = mysql.createPool({
    connectionLimit: 12500,
    host:'localhost',
    user:'tidybea1_crm_usr',
    password:'C&#u$er',
    database:'tidybea1_me_crm'
});
