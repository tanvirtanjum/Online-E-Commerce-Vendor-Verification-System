// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const service = require("../services/polices.service");

exports.getAll = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        service.getAll(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results);
                }
    
                else {
                    return res.status(204).send({ success: false, data: "No Data Found." });
                }
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.getAllActive = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        service.getAllActive(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results);
                }
    
                else {
                    return res.status(204).send({ success: false, data: "No Data Found." });
                }
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.getUserByLoginID = (req, res, next) => {
    var validated = true;
    const data = {
        login_id: req.params.id,
    };

    if(validated){
        service.getUserByLoginID(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results[0]);
                }
    
                else {
                    return res.status(204).send({ success: false, data: "No Data Found." });
                }
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.getAllByCredential = (req, res, next) => {
    var validated = true;
    const data = {
        credential: "%" + req.params.credential + "%",
    };

    if(validated){
        service.getAllByCredential(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results);
                }
    
                else {
                    return res.status(204).send({ success: false, data: "No Data Found." });
                }
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.getUserByID = (req, res, next) => {
    var validated = true;
    const data = {
        id: req.params.id,
    };

    if(validated){
        service.getUserByID(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results[0]);
                }
    
                else {
                    return res.status(204).send({ success: false, data: "No Data Found." });
                }
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.postRegistration = (req, res, next) => {
    var validated = true;
    const data = {
        'name' : req.body.name,
        'nid_no' : req.body.nid_no,
        'employee_no' : req.body.employee_no,
        'gender' : req.body.gender,
        'dob' : req.body.dob,
        'bg' : req.body.bg,
        'contact_no' : req.body.contact_no,
        'login_id' : req.body.login_id,
    };

    if(validator.isEmpty(data.name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.nid_no , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        service.postRegistration(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                return res.status(201).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.updatePolice = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
        'name' : req.body.name,
        'nid_no' : req.body.nid_no,
        'gender' : req.body.gender,
        'dob' : req.body.dob,
        'bg' : req.body.bg,
        'contact_no' : req.body.contact_no,
    };

    if(validator.isEmpty(data.name , {ignore_whitespace: true})) {
        validated = false;
    }

    // if(validator.isEmpty(data.nid_no , {ignore_whitespace: true}) && validator.isEmpty(data.passport_id , {ignore_whitespace: true})) {
    //     validated = false;
    // }

    if(validated){
        service.updatePolice(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                return res.status(200).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};