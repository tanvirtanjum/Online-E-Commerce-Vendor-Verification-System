// Importing System Library Modules
const validator = require('validator');

// Importing Created Modules
const service = require("../services/chats.service");

exports.getAllPending = (req, res, next) => {
    var validated = true;
    const data = {};

    if(validated){
        service.getAllPending(data, (error, results) => {
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

exports.getText = (req, res, next) => {
    var validated = true;
    const data = {
        id: req.params.id,
    };

    if(validated){
        service.getText(data, (error, results) => {
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

exports.getAllMyChat = (req, res, next) => {
    var validated = true;
    const data = {
        sender_id: req.params.id,
    };

    if(validated){
        service.getAllMyChat(data, (error, results) => {
            // console.log(results)
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

exports.sendText = (req, res, next) => {
    var validated = true;
    const data = {
        'sender_id' : req.body.sender_id,
        'reciever_id' : req.body.reciever_id,
        'text' : req.body.text,
    };

    if(validator.isEmpty(data.text , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        service.sendText(data, (error, results) => {
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

exports.markRead = (req, res, next) => {
    var validated = true;
    const data = {
        'reciever_id' : req.body.reciever_id,
        'id' : req.params.id,
    };

    if(validated){
        service.markRead(data, (error, results) => {
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