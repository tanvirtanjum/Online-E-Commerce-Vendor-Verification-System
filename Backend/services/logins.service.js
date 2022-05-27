const db = require("../config/db.config");

exports.getAll = (data, callback) => {
    db.query(
        `SELECT * FROM logins ORDER BY id;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getUserByID = (data, callback) => {
    db.query(
        `SELECT * FROM logins WHERE id = ?;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};

exports.getUserLogin = (data, callback) => {
    db.query(
        `SELECT * FROM logins WHERE email = ? AND password = BINARY ?;`,
        [data.email, data.password],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};

exports.getUserPassword = (data, callback) => {
    db.query(
        `SELECT logins.*, access.access_name FROM logins INNER JOIN access ON logins.access_id = access.id WHERE logins.email = ?;`,
        [data.email],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};

exports.sendUserPassword = (data, callback) => {
    db.query(
        `SELECT logins.*, access.access_name FROM logins INNER JOIN access ON logins.access_id = access.id WHERE logins.id = ?;`,
        [data.id],
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
        `INSERT INTO logins(email, password, role_id, access_id) VALUES (?, ?, ?, ?);`,
        [data.email, data.password, data.role_id, data.access_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.updateUserImage = (data, callback) => {
    db.query(
        `UPDATE logins SET img_path = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.img_path, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};