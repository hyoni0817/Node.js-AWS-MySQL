const mysql = require('mysql');
const pool = mysql.createPool({
    host : 'localhost',//'hostname',
    port : 3306,//'portnumber',//Erase the small quotation marks and use them.
    database : 'test',//'databasename',
    user : 'root',//'username',
    password : '2587',//'password',
    multipleStatements: true
   //waitForConnections:false
});

module.exports = pool;
