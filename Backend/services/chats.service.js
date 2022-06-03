const db = require("../config/db.config");

exports.getAllPending = (data, callback) => {
    db.query(
        `SELECT chats.*, logins.email, consumers.name, consumers.nid_no, consumers.passport_no FROM chats `+ 
        `INNER JOIN consumers ON chats.sender_id = consumers.login_id `+
        `INNER JOIN logins ON chats.sender_id = logins.id `+
        `WHERE chats.reciever_id IS Null ORDER BY chats.id;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getText = (data, callback) => {
    db.query(
        `SELECT chats.*, logins.email, consumers.name, consumers.nid_no, consumers.passport_no FROM chats `+ 
        `INNER JOIN consumers ON chats.sender_id = consumers.login_id `+
        `INNER JOIN logins ON chats.sender_id = logins.id `+
        `WHERE chats.id = ? ORDER BY chats.id;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getAllMyChat = (data, callback) => {
    db.query(
        `SELECT chats.* FROM chats `+ 
        `WHERE chats.sender_id = ? OR chats.reciever_id = ? ORDER BY id;`,
        [data.sender_id, data.sender_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.sendText = (data, callback) => {
    db.query(
        `INSERT INTO chats(text, sender_id, reciever_id) VALUES (?, ?, ?);`,
        [data.text, data.sender_id, data.reciever_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.markRead = (data, callback) => {
    db.query(
        `UPDATE chats SET reciever_id = ? WHERE id = ?;`,
        [data.reciever_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};