const db = require('mysql2');
const db_pool = db.createPool({
    host: 'localhost',
    user: 'root',
    database: 'db_test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

exports.get_all = (req, res) => {
    db_pool.query('SELECT * FROM tbl_test', (err, result, fields) => {
        if (!err) {
            res.send(results);
        }

        console.log(err);
    });
};

exports.create_test_table = (req, res) => {
    db_pool.query('CREATE TABLE tbl_test (uid int NOT_NULL AUTO_INCREMENT, fnm CHAR(10) NOT NULL)', (err, result, fields) => {
        if (!err) {
            res.send(result);
        }

        console.log(err);
    });
}

exports.fill_test_table = (req, res) => {
    db_pool.query('INSERT INTO tbl_test (fnm) VALUES \'Jakub\'', (err, result, fields) => {
        if (!err) {
            res.send(result);
        }

        console.log(err);
    });
}