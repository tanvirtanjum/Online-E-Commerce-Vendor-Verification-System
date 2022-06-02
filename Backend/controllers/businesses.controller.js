// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const service = require("../services/businesses.service");

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

exports.getAllByOwner = (req, res, next) => {
    var validated = true;
    const data = {
        owner_id: req.params.id,
    };

    if(validated){ 
        service.getAllByOwner(data, (error, results) => {
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

exports.getAllByID = (req, res, next) => {
    var validated = true;
    const data = {
        id: req.params.id,
    };

    if(validated){ 
        service.getAllByID(data, (error, results) => {
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
        credential: req.params.credential,
    };

    if(validated){ 
        service.getAllByCredential(data, (error, results) => {
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
        'credential' : req.body.credential,
        'address' : req.body.address,
        'emergency_contact' : req.body.emergency_contact,
        'verification_count' : 0,
        'owner_id' : req.body.owner_id,
        'type_id' : req.body.type_id,
        'verification_status_id' : 1,
    };

    if(validator.isEmpty(data.name , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validator.isEmpty(data.credential , {ignore_whitespace: true})) {
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

exports.updateApplication = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.params.id,
    };

    if(validated){
        service.updateApplication(data, (error, results) => {
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