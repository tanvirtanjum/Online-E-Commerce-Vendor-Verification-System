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
});