const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const bp = require('body-parser');
const saltr = 10;

const db = require('mysql2');
require('dotenv').config({ path: '../../../.env' });

const db_pool = db.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USR,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// User creates account
exports.db_sign_up = (req, res) => {
    const uuid = uuidv4();
    const email = req.body.email;
    const pass = req.body.password;

    bcrypt.hash(pass, saltr, function(err, hash) {
        if (!err) {
            db_pool.query(`INSERT INTO account (uuid, email, password) VALUES (\"${uuid}\", \"${email}\", \"${hash}\")`, (err, result, fields) => {
                if (!err) {
                    res.send({ uuid_v4: uuid });
                }
                
                console.log(err);
            });
        }
        
        console.log(err);
    });
};

// User profile creation
exports.db_null = (req, res) => {
     db_pool.query(`INSERT INTO account (uuid, email, password) VALUES (uuid(), \"test\", \"plshash\")`, (err, result, fields) => {
         if (!err) {
            res.send(result);
        }

        console.log(err);
    });
};