require('dotenv/config');
var mysql = require('mysql');

var conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });
  
conn.connect((err)=>{
    if(err) throw err;
    //console.log('Mysql terkoneksi');
});
  
  module.exports = conn;