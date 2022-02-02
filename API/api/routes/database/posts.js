const express = require('express');
const router = express.Router();

require('dotenv').config({ path: '../../../.env' });

const db = require('mysql2');
const db_pool = db.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USR,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: 'db_test',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


router.get('/c', (req, res) => {
    db_pool.query('CREATE TABLE tbl_test (uid INT AUTO_INCREMENT PRIMARY KEY, fnm CHAR(10))', (err, result) => {
        if (err) throw err;
        console.log('Table created');
    });
});

router.get('/i', (req, res) => {
    db_pool.query('INSERT INTO tbl_test (fnm) VALUES (\'Jakub\')', (err, result) => {
        if (err) throw err;
        console.log('Values inserted');
    });
});
router.get('/all', (req, res) => {
    db_pool.query('SELECT * FROM tbl_test', (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    });
});

// // controllers
// const posts = require('../database/posts');

// // create test table
// router.get('/c', posts.create_test_table);

// // insert values into test table
// router.get('/i', posts.fill_test_table);

// // retreive all
// router.get('/all', posts.get_all);

module.exports = router;