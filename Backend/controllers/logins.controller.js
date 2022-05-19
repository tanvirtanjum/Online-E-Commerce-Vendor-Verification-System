// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const service = require("../services/logins.service");

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


exports.getUser = (req, res, next) => {
    var validated = true;
    const data = {
        'email' : req.body.email,
        'password' : req.body.password,
    };
    // Validation Code here
    if(!validator.isEmail(data.email)) {
        validated = false;
    }
    if(validator.isEmpty(data.password , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated) {
        service.getUser(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                    return res.status(200).send(results[0]);

                } else {
                    return res.status(204).send({ success: false, data: "No User Found." });
                }
            }
        });
    } else{
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};