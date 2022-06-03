const db = require("../config/db.config");

exports.getAll = (data, callback) => {
    db.query(
        `SELECT businesses.*, business_types.type_name, verification_status.status_name, consumers.name AS cus_name, consumers.nid_no, consumers.passport_no, consumers.contact_no, consumers.login_id, logins.email FROM businesses `+
        `INNER JOIN business_types ON businesses.type_id = business_types.id `+
        `INNER JOIN verification_status ON businesses.verification_status_id = verification_status.id `+
        `INNER JOIN consumers ON businesses.owner_id = consumers.id `+
        `INNER JOIN logins ON consumers.login_id = logins.id `+
        `ORDER BY businesses.id;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getAllByStatus = (data, callback) => {
    db.query(
        `SELECT businesses.*, business_types.type_name, verification_status.status_name, consumers.name AS cus_name, consumers.nid_no, consumers.passport_no, consumers.contact_no, consumers.login_id, logins.email FROM businesses `+
        `INNER JOIN business_types ON businesses.type_id = business_types.id `+
        `INNER JOIN verification_status ON businesses.verification_status_id = verification_status.id `+
        `INNER JOIN consumers ON businesses.owner_id = consumers.id `+
        `INNER JOIN logins ON consumers.login_id = logins.id `+
        `WHERE businesses.verification_status_id = ? ORDER BY businesses.id; `,
        [data.status],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.getAllByKey = (data, callback) => {
    db.query(
        `SELECT businesses.*, business_types.type_name, verification_status.status_name, consumers.name AS cus_name, consumers.nid_no, consumers.passport_no, consumers.contact_no, consumers.login_id, logins.email FROM businesses `+
        `INNER JOIN business_types ON businesses.type_id = business_types.id `+
        `INNER JOIN verification_status ON businesses.verification_status_id = verification_status.id `+
        `INNER JOIN consumers ON businesses.owner_id = consumers.id `+
        `INNER JOIN logins ON consumers.login_id = logins.id `+
        `WHERE businesses.name LIKE ? OR businesses.credential LIKE ? ORDER BY businesses.id; `,
        [data.key, data.key],
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

exports.getAllByPolice = (data, callback) => {
    db.query(
        `SELECT businesses.*, business_types.type_name, verification_status.status_name, consumers.name AS cus_name, consumers.nid_no, consumers.passport_no, consumers.contact_no, consumers.login_id, logins.email FROM businesses `+
        `INNER JOIN business_types ON businesses.type_id = business_types.id `+
        `INNER JOIN verification_status ON businesses.verification_status_id = verification_status.id `+
        `INNER JOIN consumers ON businesses.owner_id = consumers.id `+
        `INNER JOIN logins ON consumers.login_id = logins.id `+
        `WHERE businesses.verification_officer_id = ? ORDER BY businesses.verification_status_id;`,
        [data.verification_officer_id],
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

exports.getAllByPoliceAndKey = (data, callback) => {
    db.query(
        `SELECT businesses.*, business_types.type_name, verification_status.status_name, consumers.name AS cus_name, consumers.nid_no, consumers.passport_no, consumers.contact_no, consumers.login_id, logins.email FROM businesses `+
        `INNER JOIN business_types ON businesses.type_id = business_types.id `+
        `INNER JOIN verification_status ON businesses.verification_status_id = verification_status.id `+
        `INNER JOIN consumers ON businesses.owner_id = consumers.id `+
        `INNER JOIN logins ON consumers.login_id = logins.id `+
        `WHERE (businesses.name LIKE ? OR businesses.credential LIKE ?) AND businesses.verification_officer_id = ? ORDER BY businesses.id; `,
        [data.key, data.key, data.verification_officer_id],
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
        `SELECT businesses.*, business_types.type_name, verification_status.status_name, consumers.name AS cus_name, consumers.nid_no, consumers.passport_no, consumers.contact_no, consumers.login_id, logins.email, logins.img_path FROM businesses `+
        `INNER JOIN business_types ON businesses.type_id = business_types.id `+
        `INNER JOIN verification_status ON businesses.verification_status_id = verification_status.id `+
        `INNER JOIN consumers ON businesses.owner_id = consumers.id `+
        `INNER JOIN logins ON consumers.login_id = logins.id `+
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

exports.updateStatus = (data, callback) => {
    db.query(
        `UPDATE businesses SET verification_status_id = 2, verification_officer_id = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.verification_officer_id, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};

exports.updateStatusAndCount = (data, callback) => {
    db.query(
        `UPDATE businesses SET verification_status_id = ?, verification_count = ?, updated_at = current_timestamp WHERE id = ?;`,
        [data.verification_status_id, data.verification_count, data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};