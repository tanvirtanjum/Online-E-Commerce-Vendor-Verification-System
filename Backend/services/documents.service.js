const db = require("../config/db.config");

exports.getAll = (data, callback) => {
    db.query(
        `SELECT * FROM documents ORDER BY id;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getAllByBusinessID = (data, callback) => {
    db.query(
        `SELECT * FROM documents WHERE business_id = ? ORDER BY id;`,
        [data.business_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};