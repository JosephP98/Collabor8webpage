const express = require('express');
const router = express.Router();
const cors = require('cors');
const db_func = require('../../controllers/database/postController');

const corsop = cors({
    origin: "*",
    methods: "GET, PUT"
});

require('dotenv').config({ path: '../../../.env' });

let users;

function rndString(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}

// User
router.post('/signup', (req, res) => {
    db_func.db_sign_up(req, res);
});

router.post('/login', (req, res) => {
    db_func.db_login(req, res);
});

router.post('/:uuid/create', (req, res) => {
    db_func.db_create_room(req, res);
});

router.post('/:uuid/update', (req, res) => {
    db_func.db_edit_profile(req, res);
});


// Posts/Feed
router.get('/feed', (req, res) => {
    db_func.db_get_feed(req, res);
});

// Room
// save image
router.post('/collab/:uuid', (req, res) => {
    db_func.server_store_image(req, res);
});

// get image
router.get('/collab/:uuid', (req, res) => {
    db_func.server_retrieve_image(req, res);
});

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
        users = result;
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

router.get('/post/all', (req, res) => {
    const tbl = poolConnectionHelper("post");
    tbl.query("select * from posts_tbl", (err, result, fields) => {
        if (err) throw err;
        res.send(result);
        console.log(result);
    })
});

router.get('/post/new', (req, res) => {
    const tbl = poolConnectionHelper("post");

    const rnd = {
        likes: Math.floor(Math.random() * 500),
        path: "https://picsum.photos/200",
    }

    const user = users[Math.floor(Math.random() * users.length)];
    tbl.query(`insert into posts.posts_tbl (likes, path, author, path) VALUES ('${rnd.likes}', '${rnd.path}', '${user.username}')`, (err, result, fields) => {
        if (err) throw err;
        console.log(`Values ${rnd.likes}', '${rnd.path}', '${user.username} inserted`);
        res.send(result);
    });
});
router.post('/post/new/demo', (req, res) => {
    const tbl = poolConnectionHelper("post");
    tbl.query(`insert into posts.posts_tbl (likes, path, author, caption) VALUES ('${req.likes}', '${req.path}', '${req.author}, ${req.caption}')`, (err, result, fields) => {
        if (err) throw err;
        console.log(`Values ${req.likes}, ${req.path}, ${req.author}, ${req.caption}} inserted`);

        res.send({
            status: 200,
            request_type: "POST",
            request: {
                likes: req.likes,
                path: req.path,
                author: req.author,
                caption: req.caption
            }
        });
    });
});

router.get('/user/new/joe', (req, res) => {
    const tbl = poolConnectionHelper("user");
    tbl.query(`insert into user.user_tbl (username, email, password) VALUES ('joe', 'joe@joejoe.co.uk', 'hashed and salted')`, (err, result, fields) => {
        if (err) throw err;
        console.log(result);

        res.send({
            status: 200,
            request_type: "POST",
            request: {
                username: "joe",
                email: "joe@joejoe.co.uk"
            }
        });
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