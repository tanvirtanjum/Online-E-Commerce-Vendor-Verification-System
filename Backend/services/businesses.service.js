const db = require("../config/db.config");

exports.getAll = (data, callback) => {
    db.query(
        `SELECT * FROM businesses ORDER BY id;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getAllByOwner = (data, callback) => {
    db.query(
        `SELECT businesses.*, business_types.type_name, verification_status.status_name FROM businesses `+
        `INNER JOIN business_types ON businesses.type_id = business_types.id `+
        `INNER JOIN verification_status ON businesses.verification_status_id = verification_status.id `+
        `WHERE businesses.owner_id = ? ORDER BY businesses.id;`,
        [data.owner_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getAllByOwnerAndKey = (data, callback) => {
    db.query(
        `SELECT businesses.*, business_types.type_name, verification_status.status_name FROM businesses `+
        `INNER JOIN business_types ON businesses.type_id = business_types.id `+
        `INNER JOIN verification_status ON businesses.verification_status_id = verification_status.id `+
        `WHERE (businesses.name LIKE ? OR businesses.credential LIKE ?) AND businesses.owner_id = ? ORDER BY businesses.id; `,
        [data.key, data.key, data.owner_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getAllByID = (data, callback) => {
    db.query(
        `SELECT businesses.*, business_types.type_name, verification_status.status_name FROM businesses `+
        `INNER JOIN business_types ON businesses.type_id = business_types.id `+
        `INNER JOIN verification_status ON businesses.verification_status_id = verification_status.id `+
        `WHERE businesses.id = ?;`,
        [data.id],
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
        `SELECT businesses.*, business_types.type_name, verification_status.status_name FROM businesses `+
        `INNER JOIN business_types ON businesses.type_id = business_types.id `+
        `INNER JOIN verification_status ON businesses.verification_status_id = verification_status.id `+
        `WHERE businesses.credential = ?;`,
        [data.credential],
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
        `INSERT INTO businesses(credential, name, address, emergency_contact, verification_count, owner_id, type_id, verification_status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [data.credential, data.name, data.address, data.emergency_contact, data.verification_count, data.owner_id, data.type_id, data.verification_status_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.updateApplication = (data, callback) => {
    db.query(
        `UPDATE businesses SET verification_status_id = 1, verification_officer_id = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.verification_officer_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};