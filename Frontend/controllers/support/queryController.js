$(document).ready(function () {
    $('#navbar').load(base_URL+"/views/layouts/_supportNavbar.html");
    $('#footer').load(base_URL+"/views/layouts/_commonFooter.html");

    var count = 0;
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

        if(decryptLoginInfo.role_id == 1) 
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

    
    // LOAD TABLE
    var LoadPendingChat = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/chats/get-all/pending",
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },

            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    var str = '';
                    var sl = 1;
                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {


                            str += "<tr>"+
                                        "<th>"+ sl + "</th>"+
                                        "<td>"+ data[i].name +"</td>"+
                                        "<td>"+ data[i].nid_no + " / " + data[i].passport_no +"</td>"+
                                        "<td>"+ data[i].updated_at  +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#viewModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-eye'></i> View</button></td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#table tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='5' align='middle'>NO DATA FOUND</td></tr>";
                    $("#table tbody").html(str);
                }
            }
        });
    }
    LoadPendingChat();


    // LOAD TEXT
    var LoadInformation = function(data){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/chats/get-text/"+data,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#id').val(data.id);
                   $('#text').html(data.text);
                   $('#sender').val(data.sender_id);
                }
                else {}
            }
        });
    }

    $('#viewModal').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('bs-id');
        LoadInformation(id);
    });


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

    var MarkRead = function(id, data){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/chats/mark-read/"+id,
            method: "PUT",
            data : data,
            headers : {
                role : decryptLoginInfo.role_id,
            },

            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    LoadPendingChat();
                }
                else 
                {
                    alert("Something Went Wrong");
                }
            }
        });
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

                    LoadPendingChat();

                    var mark = {
                        reciever_id: decryptLoginInfo.id,
                    }
                    MarkRead($('#id').val(), mark);
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
                reciever_id: $('#sender').val(),
            }

            SendMessage(data);
        }
    });

    setInterval(function() {
        LoadPendingChat();
    }, 0.5 * 1000);

});