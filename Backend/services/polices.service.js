const db = require("../config/db.config");

exports.getAll = (data, callback) => {
    db.query(
        `SELECT polices.*, logins.email, logins.access_id, logins.img_path FROM polices `+
        `INNER JOIN logins ON polices.login_id = logins.id `+
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

exports.getUserByLoginID = (data, callback) => {
    db.query(
        `SELECT polices.*, logins.email, logins.img_path FROM polices `+
        `INNER JOIN logins ON polices.login_id = logins.id `+
        `WHERE polices.login_id = ?;`,
        [data.login_id],
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
        `SELECT polices.*, logins.email, logins.access_id, logins.img_path FROM polices `+
        `INNER JOIN logins ON polices.login_id = logins.id `+
        `WHERE logins.access_id != 1 AND polices.name LIKE ? OR polices.nid_no LIKE ? OR polices.employee_no LIKE ? ;`,
        [data.credential, data.credential, data.credential],
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
        `SELECT polices.*, logins.email, logins.access_id, logins.img_path FROM polices `+
        `INNER JOIN logins ON polices.login_id = logins.id `+
        `WHERE polices.id = ?;`,
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
        `INSERT INTO polices(name, nid_no, employee_no, gender, dob, bg, contact_no, login_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [data.name, data.nid_no, data.employee_no, data.gender, data.dob, data.bg, data.contact_no, data.login_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.updatePolice = (data, callback) => {
    db.query(
        `UPDATE polices SET name = ?, nid_no = ?, gender = ?, dob = ?, bg = ?, contact_no = ?, updated_at = current_timestamp WHERE id = ?; `,
        [data.name, data.nid_no, data.gender, data.dob, data.bg, data.contact_no, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        }
    );
};