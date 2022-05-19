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

exports.getUser = (data, callback) => {
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