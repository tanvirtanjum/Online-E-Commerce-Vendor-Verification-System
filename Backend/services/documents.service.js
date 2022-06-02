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

exports.getFileByID = (data, callback) => {
    db.query(
        `SELECT * FROM documents WHERE id = ?;`,
        [data.id],
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

exports.insertDocument = (data, callback) => {
    db.query(
        `INSERT INTO documents(path, business_id) VALUES (?, ?);`,
        [data.path, data.business_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.deleteDocument = (data, callback) => {
    db.query(
        `DELETE FROM documents WHERE id = ?;`,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};