const mysql = require('mysql');
const pool = mysql.createPool({
    host : 'hostname',
    port : 'portnumber',//Erase the small quotation marks and use them.
    database : 'databasename',
    user : 'username',
    password : 'password',
    multipleStatements: true
   //waitForConnections:false
});

module.exports = pool;
