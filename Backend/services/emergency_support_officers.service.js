const db = require("../config/db.config");

exports.getAll = (data, callback) => {
    db.query(
        `SELECT * FROM emergency_support_officers ORDER BY id;`,
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
        `SELECT emergency_support_officers.*, logins.email, logins.img_path FROM emergency_support_officers `+
        `INNER JOIN logins ON emergency_support_officers.login_id = logins.id `+
        `WHERE emergency_support_officers.login_id = ?;`,
        [data.login_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};