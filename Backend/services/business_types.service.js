const db = require("../config/db.config");

exports.getAll = (data, callback) => {
    db.query(
        `SELECT * FROM business_types ORDER BY id;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};