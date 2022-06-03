const db = require("../config/db.config");

exports.getAllPending = (data, callback) => {
    db.query(
        `SELECT chats.*, consumers.name AS cus_name, consumers.nid_no, consumers.passport_no, consumers.contact_no, consumers.login_id, logins.email FROM chats `+ 
        `INNER JOIN consumers ON chats.cus_id = consumers.id `+
        `INNER JOIN logins ON consumers.login_id = logins.id `+
        `WHERE chats.eso_id = null ORDER BY id;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};