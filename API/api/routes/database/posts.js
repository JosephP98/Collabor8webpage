const express = require('express');
const router = express.Router();

require('dotenv').config({ path: '../../../.env' });

const db = require('mysql2');
<<<<<<< Updated upstream
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
=======
let users;
>>>>>>> Stashed changes


router.get('/c', (req, res) => {
    db_pool.query('CREATE TABLE tbl_test (uid INT AUTO_INCREMENT PRIMARY KEY, fnm CHAR(10))', (err, result) => {
        if (err) throw err;
        console.log('Table created');
    });
});

<<<<<<< Updated upstream
router.get('/i', (req, res) => {
    db_pool.query('INSERT INTO tbl_test (fnm) VALUES (\'Jakub\')', (err, result) => {
        if (err) throw err;
        console.log('Values inserted');
    });
=======
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
    tbl.query("select * from user.user_tbl", (err, result, fields) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
        users = result;
    })
>>>>>>> Stashed changes
});
router.get('/all', (req, res) => {
    db_pool.query('SELECT * FROM tbl_test', (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    });
});

router.get('/post/all', (req, res) => {
    const tbl = poolConnectionHelper("post");
    tbl.query("select * from posts.posts_tbl", (err, result, fields) => {
        if (err) throw err;
        res.send(`
        <p>${result[0]["author"]}</p>
        <img src="${result[0]["path"]}" width="200" height="200">
        `);
        console.log(result);
    })
});

router.get('/post/new', (req, res) => {
    const tbl = poolConnectionHelper("post");

    const rnd = {
        likes: Math.floor(Math.random() * 500),
        path: "https://picsum.photos/200",
    }

    const user = users[Math.floor(Math.random() * users.length)]

    tbl.query(`insert into posts.posts_tbl (likes, path, author) VALUES ('${rnd.likes}', '${rnd.path}', '${user.username}')`, (err, result, fields) => {
        if (err) throw err;
        console.log(`Values ${rnd.likes}, ${rnd.path}, ${user}} inserted`);
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