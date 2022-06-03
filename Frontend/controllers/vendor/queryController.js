$(document).ready(function () {
    $('#navbar').load(base_URL+"/views/layouts/_vendorNavbar.html");
    $('#footer').load(base_URL+"/views/layouts/_commonFooter.html");

    var redirect = function(role) {
        if(role == null)
        {
            window.location.href = base_URL+"/views/public/home.html";
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
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        if(decryptLoginInfo.role_id == 3) 
        {

        }
        else
        {   
            redirect(decryptLoginInfo.role_id);
        }
    }

    if(localStorage.getItem('loginInfo') == null)
    {
        redirect(null);
    }
    else
    {
        checkLocalStorage();
    }

    // LOAD TEXT
    var LoadText = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/chats/get-all/my_chat/"+decryptLoginInfo.id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },

            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    var str = '';

                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            if(data[i].sender_id == decryptLoginInfo.id)
                            {
                                str += '<div class="card border-secondary mb-3">'+
                                            '<div class="card-body text-dark text-start">'+
                                               data[i].text+
                                            '</div>'+
                                        '</div>';
                            }
                            if(data[i].reciever_id == decryptLoginInfo.id)
                            {
                                str += '<div class="card border-secondary mb-3">'+
                                            '<div class="card-body text-dark text-end">'+
                                               data[i].text+
                                            '</div>'+
                                        '</div>';
                            }
                            
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#text").html(str);
                    $("#text").scrollTop($('#text')[0].scrollHeight);
                }
                else 
                {
                    str += "";
                    $("#text").html(str);
                }
            }
        });
    }

    LoadText();


    var RefreshText = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/chats/get-all/my_chat/"+decryptLoginInfo.id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },

            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    var str = '';

                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            if(data[i].sender_id == decryptLoginInfo.id)
                            {
                                str += '<div class="card border-secondary mb-3">'+
                                            '<div class="card-body text-dark text-start">'+
                                               data[i].text+
                                            '</div>'+
                                        '</div>';
                            }
                            if(data[i].reciever_id == decryptLoginInfo.id)
                            {
                                str += '<div class="card border-secondary mb-3">'+
                                            '<div class="card-body text-dark text-end">'+
                                               data[i].text+
                                            '</div>'+
                                        '</div>';
                            }
                            
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#text").html(str);
                }
                else 
                {
                    str += "";
                    $("#text").html(str);
                }
            }
        });
    }

     // SEND TEXT
     var validateText= function() {
        var validate = true;

        if($.trim($('#msg').val()).length <= 0)
        {
            validate = false;
            $('#msg').addClass("is-invalid");
        }
        else
        {
            $("#msg").removeClass("is-invalid");
        }

        return validate;
    }


    var SendMessage = function(data){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/chats/send-text",
            method: "POST",
            data : data,
            headers : {
                role : decryptLoginInfo.role_id,
            },

            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    LoadText();
                }
                else 
                {
                    alert("Something Went Wrong");
                }
            }
        });
    }

    $("#sendBTN").click(function () {
        if(validateText())
        {
            var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
            decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
            decryptLoginInfo = JSON.parse(decryptLoginInfo);

            var data = {
                text: $('#msg').val(),
                sender_id: decryptLoginInfo.id,
            }

            SendMessage(data);
        }
    });

    setInterval(function() {
        RefreshText();
    }, 0.5 * 1000); // 1 * 1000 milsec

});