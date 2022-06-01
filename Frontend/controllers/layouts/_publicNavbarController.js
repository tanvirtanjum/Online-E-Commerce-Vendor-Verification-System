$(document).ready(function () {
    $('#homeTab').attr("href", base_URL+"/views/public/home.html");
    $('#searchTab').attr("href", base_URL+"/views/public/search.html");

    function activeSection()
    {
        if(window.location.href == base_URL+"/views/public/home.html")
        {
            $('#homeTab').addClass("active");
        }

        if(window.location.href == base_URL+"/views/public/search.html")
        {
            $('#searchTab').addClass("active");
        }
    }

    activeSection();

    var redirect = function(role) {
        if(role == null)
        {
            
        }
        if(role == 1)
        {
            window.location.href = base_URL+"/views/support/dashboard.html";
        }
        if(role == 2)
        {
            window.location.href = base_URL+"/views/police/dashboard.html";
        }
        if(role == 3)
        {
            window.location.href = base_URL+"/views/vendor/dashboard.html";
        }       
    }

    var checkLocalStorage = function() {
        if(localStorage.getItem('loginInfo') === null) 
        {

        }
        else
        {
            var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);
            
            redirect(decryptLoginInfo.role_id);
        }
    }

    // LOGIN
    $("#signinModal").on('show.bs.modal', function() {
        $("#login_email").val("");
        $("#login_password").val("");
        
        checkLocalStorage();
    });

    var validateLogin = function() {
        var validate = true;
        if($.trim($("#login_email").val()).length <= 0)
        {
            validate = false;
            $("#login_email").addClass("is-invalid");
        }
        else
        {
            $("#login_email").removeClass("is-invalid");
        }
        
        if($.trim($("#login_password").val()).length <= 0)
        {
            validate = false;
            $("#login_password").addClass("is-invalid");
        }
        else
        {
            $("#login_password").removeClass("is-invalid");
        }

        return validate;
    }

    var userLogin = function () {
        $.ajax({
            url: api_base_URL+"/api/logins/get-user-authentication",
            method: "POST",
            data: {
                email : $("#login_email").val(),
                password : $("#login_password").val(),
            },
            
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.access_id == 3)
                    {
                        localStorage.setItem('loginInfo', CryptoJS.AES.encrypt(JSON.stringify(data), '333'));

                        $('#msg').attr('hidden', true);

                        //USER TYPE WISE REDIRECTION
                        redirect(data.role_id);
                    }
                    else
                    {
                        alert("You dont have login permission.");
                    }
                   
                }
                else {
                    var data = xhr.responseJSON;
                    alert("Invalid email/password.\nTry Again.");
                }
            }
        });
    }

    $("#loginBTN").click(function () {
        if(validateLogin())
        {
            userLogin();
        }
    });


    


    // RECOVER PASSWORD
    var validateRecover = function() {
        var validate = true;
        if($.trim($("#recover_email").val()).length <= 0)
        {
            validate = false;
            $("#recover_email").addClass("is-invalid");
        }
        else
        {
            $("#recover_email").removeClass("is-invalid");
        }

        return validate;
    }

    var recoverPassword = function (data) {
        $.ajax({
            url: api_base_URL+"/api/logins/get-user-authentication-password",
            method: "POST",
            data: data,
            
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    alert("Check your email.\nPassword has been sent.");
                   
                }
                else {
                    var data = xhr.responseJSON;
                    
                    alert("Something went wrong.\nCheck if valid email and try again.");
                }
            }
        });
    }

    $("#recoverBTN").click(function () {
        $('#msg').attr('hidden', true);
        if(validateRecover())
        {
            var data = {
                email : $("#recover_email").val(),
            }

            recoverPassword(data);
        }
    });




    // REGISTRATION
    var validateRegistration= function() {
        var validate = true;

        if($.trim($('#signup_name').val()).length <= 0)
        {
            validate = false;
            $('#signup_name').addClass("is-invalid");
        }
        else
        {
            $("#signup_name").removeClass("is-invalid");
        }

        if($.trim($('#signup_email').val()).length <= 0)
        {
            validate = false;
            $('#signup_email').addClass("is-invalid");
        }
        else
        {
            $("#signup_email").removeClass("is-invalid");
        }

        if($.trim($('#signup_contact').val()).length != 10)
        {
            validate = false;
            $('#signup_contact').addClass("is-invalid");
        }
        else
        {
            $("#signup_contact").removeClass("is-invalid");
        }

        if($.trim($("#signup_nid").val()).length <= 0 && $.trim($("#signup_passport").val()).length <= 0)
        {
            validate = false;
            $("#signup_nid").addClass("is-invalid");
            $("#signup_passport").addClass("is-invalid");
        }
        else
        {
            $("#signup_nid").removeClass("is-invalid");
            $("#signup_passport").removeClass("is-invalid");
        }

        if($.trim($("#signup_dob").val()).length <= 0)
        {
            validate = false;
            $("#signup_dob").addClass("is-invalid");
        }
        else
        {
            $("#signup_dob").removeClass("is-invalid");
        }

        return validate;
    }

    var sendPassword = function (send_data) {
        $.ajax({
            url: api_base_URL+"/api/logins/send-user-authentication-password",
            method: "POST",
            data: send_data,
            
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;
                }
                else {
                    
                }
            }
        });
    }

    var InsertConsumer = function(consumer_data){
        $.ajax({
            url: api_base_URL+"/api/consumers/insert-consumer-registration",
            method: "POST",
            data : consumer_data,
            
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    if(data.insertId >= 1)
                    {
                        var send_data = {
                            id: consumer_data.login_id,
                        }

                        sendPassword(send_data);
                        alert("Registration Successful");                       
                    }
                    else 
                    {
                        alert("Something Went Wrong.\nTry Again.");
                    }
                }
                else 
                {
                    alert("Something Went Wrong.\nTry Again.");
                }
            }
        });
    }

    var InsertLogin = function(data){
        $.ajax({
            url: api_base_URL+"/api/logins/insert-consumer-registration",
            method: "POST",
            data : data,
            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    var consumer_data = {
                        login_id: data.insertId,
                        name: $('#signup_name').val(), 
                        nid_no: $('#signup_nid').val(), 
                        passport_no: $('#signup_passport').val(), 
                        gender: $('#signup_gender').val(), 
                        dob: $('#signup_dob').val(), 
                        bg: $('#signup_bg').val(), 
                        contact_no: "+880" + $('#signup_contact').val(),
                    }

                    if($.trim($("#signup_nid").val()).length <= 0)
                    {
                        delete consumer_data.nid_no;
                    }
                    if($.trim($("#signup_passport").val()).length <= 0)
                    {
                        delete consumer_data.passport_no;
                    }

                    InsertConsumer(consumer_data);
                }
                else 
                {
                    alert("This user already has an account.");
                }
            }
        });
    }

    $("#signupBTN").click(function () {
        if(validateRegistration())
        {
            var login_data = {
                email : $('#signup_email').val(),
                password: Math.floor(1000000 + Math.random() * 900000),
            }

            InsertLogin(login_data);
        }
    });
});