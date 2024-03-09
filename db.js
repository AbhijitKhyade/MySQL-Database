const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise(); //so that we can use async await

pool.getConnection((err, connection) => {
    if (err) {
        console.log('Error connecting to MYSQL: ', err);
        return;
    }
    console.log("Connected successfully to MYSQL");
    console.log("Connection URL: ", connection.config.connectionConfig);

    connection.release();
});

module.exports = pool;