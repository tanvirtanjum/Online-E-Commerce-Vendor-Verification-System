// Importing System Library Modules
const validator = require('validator');
const nodemailer = require('nodemailer');

// Importing Created Modules
const service = require("../services/logins.service");

// Config Mailer
var transporter = nodemailer.createTransport({
    service: process.env.RECPASS_SERVICE,
    auth: {
      user: process.env.RECPASS_EMAIL,
      pass: process.env.RECPASS_EMAIL_PASS 
    }
});

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


exports.getUserLogin = (req, res, next) => {
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
        service.getUserLogin(data, (error, results) => {
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


exports.getUserPassword = (req, res, next) => {
    var validated = true;
    const data = {
        'email' : req.body.email,
    };
    // Validation Code here
    if(!validator.isEmail(data.email)) {
        validated = false;
    }

    if(validated) {
        
        service.getUserPassword(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                      
                    var mailOptions = {
                        from: process.env.RECPASS_EMAIL,
                        to: results[0].email,
                        subject: 'Recover Password (OEVVS Portal)',
                        html: '<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">'+
                                '<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: "Open" Sans", sans-serif;">'+
                                    '<tr>'+
                                        '<td>'+
                                        ' <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">'+
                                                '<tr>'+
                                                    '<td style="height:80px;">&nbsp;</td>'+
                                                '</tr>'+
                                            
                                                '<tr>'+
                                                    '<td style="height:20px;">&nbsp;</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td>'+
                                                        '<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">'+
                                                            '<tr>'+
                                                                '<td style="height:40px;">&nbsp;</td>'+
                                                            '</tr>'+
                                                            '<tr>'+
                                                                '<td style="padding:0 35px;">'+
                                                                    '<h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:"Rubik",sans-serif;">'+
                                                                        'You have requested to recover your password'+
                                                                    '</h1>'+
                                                                    '<span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>'+
                                                                    '<p style="color:#455056; font-size:15px;line-height:24px; margin:0;">'+
                                                                        '<p>Email: <b><i>'+results[0].email+'</i></b></p>'+
                                                                        '<p>Password: <b style="color:blue;">'+results[0].password+'</b></p>'+
                                                                        '<p>Access: <b style="color:red;">'+results[0].access_name+'</b></p>'+
                                                                    '</p>'+
                                                                    '<a href="javascript:void(0);" style="background:#20e25a;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">'+
                                                                        'For safety change your password after login.'+
                                                                    '</a>'+
                                                                '</td>'+
                                                            '</tr>'+
                                                            '<tr>'+
                                                                '<td style="height:40px;">&nbsp;</td>'+
                                                            '</tr>'+
                                                        '</table>'+
                                                    '</td>'+
                                                '<tr>'+
                                                    '<td style="height:20px;">&nbsp;</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td style="text-align:center;">'+
                                                    ' <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>OEVVS - Online E-Commerce Vendor Verification</strong></p>'+
                                                    '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td style="height:80px;">&nbsp;</td>'+
                                                '</tr>'+
                                            '</table>'+
                                        '</td>'+
                                    '</tr>'+
                                '</table>'+
                            '</body>'
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            return res.status(204).send({ success: false, data: "Something went wrong." });
                        } else {
                            return res.status(200).send({ success: true, data: "Password sent to email." });
                        }
                    });

                    // return res.status(200).send(results[0]);

                } else {
                    return res.status(204).send({ success: false, data: "No User Found." });
                }
            }
        });
    } else{
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};

exports.sendUserPassword = (req, res, next) => {
    var validated = true;
    const data = {
        'id' : req.body.id,
    };
    // Validation Code here

    if(validated) {
        service.sendUserPassword(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                if (results.length > 0) {
                      
                    var mailOptions = {
                        from: process.env.RECPASS_EMAIL,
                        to: results[0].email,
                        subject: 'Account Created (OEVVS Portal)',
                        html: '<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">'+
                                '<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: "Open" Sans", sans-serif;">'+
                                    '<tr>'+
                                        '<td>'+
                                        ' <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">'+
                                                '<tr>'+
                                                    '<td style="height:80px;">&nbsp;</td>'+
                                                '</tr>'+
                                            
                                                '<tr>'+
                                                    '<td style="height:20px;">&nbsp;</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td>'+
                                                        '<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">'+
                                                            '<tr>'+
                                                                '<td style="height:40px;">&nbsp;</td>'+
                                                            '</tr>'+
                                                            '<tr>'+
                                                                '<td style="padding:0 35px;">'+
                                                                    '<h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:"Rubik",sans-serif;">'+
                                                                        'Your account has been created.'+
                                                                    '</h1>'+
                                                                    '<span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>'+
                                                                    '<p style="color:#455056; font-size:15px;line-height:24px; margin:0;">'+
                                                                        '<p>Email: <b><i>'+results[0].email+'</i></b></p>'+
                                                                        '<p>Password: <b style="color:blue;">'+results[0].password+'</b></p>'+
                                                                        '<p>Access: <b style="color:red;">'+results[0].access_name+'</b></p>'+
                                                                    '</p>'+
                                                                    '<a href="javascript:void(0);" style="background:#20e25a;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">'+
                                                                        'For safety change your password after login.'+
                                                                    '</a>'+
                                                                '</td>'+
                                                            '</tr>'+
                                                            '<tr>'+
                                                                '<td style="height:40px;">&nbsp;</td>'+
                                                            '</tr>'+
                                                        '</table>'+
                                                    '</td>'+
                                                '<tr>'+
                                                    '<td style="height:20px;">&nbsp;</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td style="text-align:center;">'+
                                                    ' <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>OEVVS - Online E-Commerce Vendor Verification</strong></p>'+
                                                    '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                    '<td style="height:80px;">&nbsp;</td>'+
                                                '</tr>'+
                                            '</table>'+
                                        '</td>'+
                                    '</tr>'+
                                '</table>'+
                            '</body>'
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            return res.status(204).send({ success: false, data: "Something went wrong." });
                        } else {
                            return res.status(200).send({ success: true, data: "Password sent to email." });
                        }
                    });

                } else {
                    return res.status(204).send({ success: false, data: "No User Found." });
                }
            }
        });
    } else{
        return res.status(400).send({ success: false, data: "Page Not Properly Validated." });
    }

};


exports.postRegistration = (req, res, next) => {
    var validated = true;
    const data = {
        'email' : req.body.email,
        'password' : req.body.password,
        'role_id' : 3,
        'access_id' : 1,
    };

    if(validator.isEmpty(data.email , {ignore_whitespace: true})) {
        validated = false;
    }

    if(!validator.isEmail(data.email)) {
        validated = false;
    }

    if(validator.isEmpty(data.password , {ignore_whitespace: true})) {
        validated = false;
    }

    if(validated){
        service.postRegistration(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {

                // console.log(results);
                return res.status(201).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};

exports.updateUserImage = (req, res, next) => {
    var validated = true;

    if(req.file == null) {
        validated = false;
    }

    if(validated){
        const data = {
            'id' : req.params.id,
            'img_path': req.file.path,
        };
        service.updateUserImage(data, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).send({ success: false, data: "Bad Request. {{--> "+error+" <--}}" });
            }
            else {
                try {
                    if(req.header("path") != "uploads/avatar/profile_avatar.png")
                    {
                        fs.unlinkSync(req.header("path"))
                        //file removed
                    }
                } 
                catch(err) {
                    console.error(err)
                }
                return res.status(200).send(results);
            }
        });
    }
    else{
        return res.status(401).send({ success: false, data: "Unauthorized Request." })
    }

};
