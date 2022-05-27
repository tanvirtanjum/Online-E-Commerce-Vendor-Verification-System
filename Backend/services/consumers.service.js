const db = require("../config/db.config");

exports.getAll = (data, callback) => {
    db.query(
        `SELECT * FROM consumers ORDER BY id;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getUserByLoginID = (data, callback) => {
    db.query(
        `SELECT consumers.*, logins.email, logins.img_path FROM consumers `+
        `INNER JOIN logins ON consumers.login_id = logins.id `+
        `WHERE consumers.login_id = ?;`,
        [data.login_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.postRegistration = (data, callback) => {
    db.query(
        `INSERT INTO consumers(name, nid_no, passport_no, gender, dob, bg, contact_no, login_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [data.name, data.nid_no, data.passport_no, data.gender, data.dob, data.bg, data.contact_no, data.login_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};