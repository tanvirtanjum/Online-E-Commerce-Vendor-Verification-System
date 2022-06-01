const db = require("../config/db.config");

exports.getAllRegistered = (data, callback) => {
    db.query(
        `SELECT consumers.*, logins.email, logins.access_id, logins.img_path FROM consumers `+
        `INNER JOIN logins ON consumers.login_id = logins.id `+
        `WHERE logins.access_id != 1;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getAllUnregistered = (data, callback) => {
    db.query(
        `SELECT consumers.*, logins.email, logins.access_id, logins.img_path FROM consumers `+
        `INNER JOIN logins ON consumers.login_id = logins.id `+
        `WHERE logins.access_id = 1;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getAllByCredential = (data, callback) => {
    db.query(
        `SELECT consumers.*, logins.email, logins.access_id, logins.img_path FROM consumers `+
        `INNER JOIN logins ON consumers.login_id = logins.id `+
        `WHERE logins.access_id != 1 AND consumers.name LIKE ? OR consumers.nid_no LIKE ? OR consumers.passport_no LIKE ? ;`,
        [data.credential, data.credential, data.credential],
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
        `SELECT consumers.*, logins.email, logins.access_id, logins.img_path FROM consumers `+
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

exports.getUserByID = (data, callback) => {
    db.query(
        `SELECT consumers.*, logins.email, logins.access_id, logins.img_path FROM consumers `+
        `INNER JOIN logins ON consumers.login_id = logins.id `+
        `WHERE consumers.id = ?;`,
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

exports.updateConsumer = (data, callback) => {
    db.query(
        `UPDATE consumers SET name = ?, nid_no = ?, passport_no = ?, gender = ?, dob = ?, bg = ?, contact_no = ?, updated_at = current_timestamp WHERE id = ?; `,
        [data.name, data.nid_no, data.passport_no, data.gender, data.dob, data.bg, data.contact_no, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};

exports.deleteConsumer = (data, callback) => {
    db.query(
        `DELETE FROM consumers WHERE id = ?; `,
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};