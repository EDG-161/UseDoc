const mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: 'http://206.81.2.189/',
        user: 'usedoc_user',
        password: 'Use_pass223856220',
        database: 'usedoc'
    });
}