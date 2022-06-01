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
        `WHERE owner_id = ? ORDER BY id;`,
        [data.owner_id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        }
    );
};