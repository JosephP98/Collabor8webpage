const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltr = 10;
const db = require('mysql2');
const fs = require('fs');
const path = require('path');
const e = require('express');
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
    const uname = req.body.username;

    bcrypt.hash(pass, saltr, function (err, hash) {
        if (!err) {
            db_pool.getConnection((err, con) => {
                if (err) {
                    throw err;
                }

                con.beginTransaction(err => {
                if (err) { throw err; }
                
                con.query(`INSERT INTO account (uuid, email, password) VALUES (\"${uuid}\", \"${email}\", \"${hash}\")`, (err, result) => {
                    if (err) {
                        con.rollback(err => { throw err; })
                    };
                });

                con.query(`INSERT INTO user (uuid, username) VALUES (\"${uuid}\", \"${uname}\")`, (err, result) => {
                    if (err) {
                        con.rollback(err => { throw err; });
                    }
                });

                con.commit(err => {
                    if (err) {
                        con.rollback(err => { throw err; });
                    }
                
                    console.log("transaction completed...");
                    res.send({ uuid_v4: uuid });
                });
            });
            })
        }
        
        console.log(err);
    });
};

exports.db_login = (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;

    bcrypt.hash(pass, saltr, function (err, hash) { 
        if (err) {
            throw err;
        }

        db_pool.query(`SELECT uuid, password FROM account WHERE email = \"${email}\"`, (err, eres) => {
            if (err) {
                throw err;
            }

            if (eres.length === 1) {
                bcrypt.compare(pass, eres[0].password, (err, hres) => {
                    if (err) {
                        throw err;
                    }

                    if (hres) {
                        res.send({ uuid: eres[0].uuid });
                    } else {
                        res.send({ err: "no match" });
                    }
                });
            } else {
                res.send({ err: "no match" });
            }
        });
    });
}

// Create Room
exports.db_create_room = (req, res) => {
    const room_uuid = uuidv4();
    const user_uuid = req.params.uuid;
    const room_name = req.body.room_name;

    db_pool.getConnection((err, con) => {
        if (err) { throw err; }

        con.beginTransaction(err => {
            if (err) { throw err; }
            

            con.query(`INSERT INTO room (uuid, name) VALUES (\"${room_uuid}\", \"${room_name}\")`, (err, result) => {
                if (err) {
                    con.rollback(err => { throw err; })
                };
            });


            con.query(`INSERT INTO rooms (uuid, user_uuid, room_uuid) VALUES (\"${uuidv4()}\", \"${user_uuid}\", \"${room_uuid}\")`, (err, result) => {
                if (err) {
                    con.rollback(err => { throw err; });
                }
            });

            con.query(`INSERT INTO post (uuid, img, title) VALUES (\"${uuidv4()}\", \"${room_uuid}\", \"${room_name}\")`, (err, result) => {
                if (err) {
                    con.rollback(err => { throw err; });
                }
            });

            con.commit(err => {
                if (err) {
                    con.rollback(err => { throw err; });
                }
            
                console.log("transaction completed...");
                res.send({ uuid_v4: room_uuid });
            });
        });
    });
};

exports.db_join_room = (req, res) => {
    const user_uuid = req.body.user_uuid;
    const room_uuid = req.params.uuid;
    const uuid = uuidv4();
    const equal = (e) => e.user_uuid === user_uuid;

    db_pool.getConnection((err, con) => {
        if (err) { throw err; }

        con.beginTransaction(err => {
            if (err) { throw err; }

            con.query(`SELECT user_uuid FROM rooms WHERE room_uuid = \"${room_uuid}\"`, (err, result) => {
                if (err) {
                    con.rollback(err => { throw err; })
                };

                console.log(result.findIndex(equal));
                console.log(result.findIndex(equal) === -1);

                if (result.findIndex(equal) === -1) {
                    // add to contributors
                    con.query(`INSERT INTO rooms (uuid, user_uuid, room_uuid) VALUES (\"${uuid}\", \"${user_uuid}\", \"${room_uuid}\")`, (err, result) => {
                        if (err) {
                            throw err;
                        }

                        //console.log(result);
                    });

                    con.query(`UPDATE post SET collabs = collabs + 1 WHERE img = \"${room_uuid}\"`, (err, result) => {
                        if (err) {
                            throw err;
                        }

                        //console.log(result);
                    });
                }

                con.commit(err => {
                        if (err) {
                            con.rollback(err => { throw err; });
                        }
                        
                        console.log("transaction completed...");
                        res.send(result);
                    });
            });
        });
    });
};

// TODO: PLACE IN PUT
exports.db_edit_profile = (req, res) => {
    const user_uuid = req.params.uuid;

    // TODO: Handle image storage
    // SOLUTION: Handle PP in seprate func
    // const pic = req.body.pic;

    db_pool.query(`SELECT username, bio FROM user WHERE uuid = \"${user_uuid}\"`, (err, result) => {
        const prev = result[0];    
        const username = req.body.username || prev.username;
        const bio = req.body.bio || prev.bio;
        
        db_pool.getConnection((err, con) => {
            if (err) { throw err; }

            con.beginTransaction(err => {
                if (err) { throw err; }
                

                con.query(`UPDATE user SET username = \"${username}\",  bio = \"${bio}\" WHERE uuid = \"${user_uuid}\"`, (err, result) => {
                    if (err) {
                        console.log(err);
                        con.rollback(err => { throw err; })
                    };
                });

                con.commit(err => {
                    if (err) {
                        con.rollback(err => { throw err; });
                    }
                
                    console.log("transaction completed...");
                    res.send({
                        prev: prev,
                        new: [username, bio]
                    });
                });
            });
        });
    });
};

exports.server_store_image = (req, res) => {
    const room_uuid = req.params.uuid;
    const data = req.body.img_data;

    const f_path = `${path.resolve(process.cwd(), "../Storage/collab/img/" + room_uuid + ".json")}`;
    //console.log(f_path);

    fs.writeFile(f_path, data, err => {
        if (err) {
            console.log(err);
            throw err;
        }

        res.send(data);
    });
};

exports.server_retrieve_image = (req, res) => {
    const room_uuid = req.params.uuid;
    const f_path = `${path.resolve(process.cwd(), "../Storage/collab/img/" + room_uuid + ".json")}`;
    //console.log(f_path);


    fs.access(f_path, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.readFile(f_path, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    throw err;
                }

                res.send(data);
            });
        } else {
            res.send({ data: null });
        }
    });
}

exports.server_store_chat = (req, res) => {
    const room_uuid = req.params.uuid;
    const data = req.body.img_data;
    const f_path = `${path.resolve(process.cwd(), "../Storage/collab/logs/" + room_uuid + ".json")}`;
    //console.log(f_path);

    fs.writeFile(f_path, JSON.stringify(data), err => {
        if (err) {
            console.log(err);
            throw err;
        }

        res.send(data);
    });
};

exports.server_retrieve_chat = (req, res) => {
    const room_uuid = req.params.uuid;
    const f_path = `${path.resolve(process.cwd(), "../Storage/collab/logs/" + room_uuid + ".json")}`;
    //console.log(f_path);

    fs.readFile(f_path, 'utf8', (err, data) => {
        if (err) {
            console.log(req.body.img_data);
            console.log(err);
            throw err;
        }

        res.send(data);
    });
};

    exports.db_get_feed = (req, res) => {
        db_pool.query("SELECT * FROM post", (err, results) => {
            if (err) {
                console.log(err);
                throw err;
            }

            res.send(results);
        });
    };