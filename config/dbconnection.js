const mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: 'gautabases.ga',
        user: 'usedoc_user',
        password: 'Use_pass223856220',
        database: 'usedoc'
    });
}