const mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'n0m3l0',
        database: 'usedoc_bd'
    });
}