const express = require('express');
const router = express.Router();

require('dotenv').config({ path: '../../../.env' });

const db = require('mysql2');

function poolConnectionHelper(table) {
    let use_table;

    switch (table) {
        case "user":
            use_table = process.env.DB_USER
            break;
        case "post":
            use_table = process.env.DB_POSTS
            break;
        default:
            use_table = process.env.DB_TEST
    }

    const tbl = db.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USR,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        database: use_table,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    return tbl;
}

function rndString(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}


// router.get('/c', (req, res) => {
//     db_pool.query('CREATE TABLE tbl_test (uid INT AUTO_INCREMENT PRIMARY KEY, fnm CHAR(10))', (err, result) => {
//         if (err) throw err;
//         console.log('Table created');
//     });
// });

// router.get('/i', (req, res) => {
//     db_pool.query('INSERT INTO tbl_test (fnm) VALUES (\'Jakub\')', (err, result) => {
//         if (err) throw err;
//         console.log('Values inserted');
//     });
// });
// router.get('/all', (req, res) => {
//     db_pool.query('SELECT * FROM tbl_test', (err, result, fields) => {
//         if (err) throw err;
//         console.log(result);
//     });
// });

router.get('/user/all', (req, res) => {
    const tbl = poolConnectionHelper("user");
    tbl.query("select * from user_tbl", (err, result, fields) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
    })
});

router.get('/user/new', (req, res) => {
    const tbl = poolConnectionHelper("user");

    const rnd = {
        usr: rndString(10),
        eml: rndString(5)+"@gmail.com",
        pass: rndString(30)
    }


    tbl.query(`insert into user.user_tbl (username, email, password) VALUES ('${rnd.usr}', '${rnd.eml}', '${rnd.pass}')`, (err, result, fields) => {
        if (err) throw err;
        console.log(`Values ${rnd.usr}, ${rnd.eml}, ${rnd.pass} inserted`);
    })

    res.send(rnd);
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