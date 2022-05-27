// const db = require("../config/db.config");

exports.authLogin = (req, res, next) => {
    if (req.header("role") == null || req.header("role").trim().length <= 0) {
            return res.status(401).send({ success: false, data: "Unauthorized Request." });
    }
    next();
};

exports.authSupport = (req, res, next) => {
    if (req.header("role") != 1) {
            return res.status(401).send({ success: false, data: "Unauthorized Request." });
    }
    next();
};

exports.authPolice = (req, res, next) => {
    if (req.header("role") != 2) {
            return res.status(401).send({ success: false, data: "Unauthorized Request." });
    }
    next();
};

exports.authVendor = (req, res, next) => {
    if (req.header("role") != 3) {
            return res.status(401).send({ success: false, data: "Unauthorized Request." });
    }
    next();
};

exports.authSupport_Police = (req, res, next) => {
    if (req.header("role") == 1 || req.header("role") == 2) {
        next();
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." });
    }   
};

exports.authSupport_Police_Vendor = (req, res, next) => {
    if (req.header("role") == 1 || req.header("role") == 2 || req.header("role") == 3) {
        next();
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." });
    }   
};
