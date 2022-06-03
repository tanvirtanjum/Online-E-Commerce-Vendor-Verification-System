$(document).ready(function () {
    $('#navbar').load(base_URL+"/views/layouts/_supportNavbar.html");
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
    var LoadAllVendor = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/consumers/get-all-consumers/registered",
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
                                        "<td>"+ data[i].contact_no  +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button></td>"+
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
    LoadAllVendor();

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

    var deleteLogin = function (id) {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/logins/delete-user/"+id,
            method: "DELETE",
            headers : {
                role : decryptLoginInfo.role_id,
            },

            complete: function (xhr, status) {
                if (xhr.status == 204) {
                    var data = xhr.responseJSON;
                    LoadAllVendor();                 
                }
                else {
                    var data = xhr.responseJSON;
                    alert("Something went wrong.\nTry again.");
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

                        LoadAllVendor();
                        sendPassword(send_data);
                        alert("Registration Successful");                       
                    }
                    else 
                    {
                        deleteLogin(consumer_data.login_id);
                        alert("Something Went Wrong.\nTry Again.");
                    }
                }
                else 
                {
                    deleteLogin(consumer_data.login_id);
                    alert("Something Went Wrong.\nTry Again.");
                }
            }
        });
    }

    var InsertLogin = function(data){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/logins/insert-consumer",
            method: "POST",
            data : data,
            headers : {
                role : decryptLoginInfo.role_id,
            },

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


    // LOAD TABLE
    var LoadAllVendorByCredential = function(data){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/consumers/get-all-consumers/registered/credential/"+data,
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
                                        "<td>"+ data[i].contact_no  +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button></td>"+
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

    $("#search").on("keyup change",function(){
        if($.trim($("#search").val()).length > 0)
        {
            LoadAllVendorByCredential($("#search").val());
        }
        else
        {
            LoadAllVendor();
        }
    });


    // LOAD VENDOR
    // LOAD PROFILE INFORMATION
    var LoadInformation = function(data){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/consumers/get-consumer/id/"+data,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#avatar').attr('src', api_base_URL+'/api/downloads?path='+data.img_path+"");
                   $('#update_id').val(data.id);
                   $('#update_login_id').val(data.login_id);
                   $('#update_name').val(data.name);
                   $('#update_gender').val(data.gender);
                   $('#update_contact').val(data.contact_no.slice(4));
                   $('#update_email').val(data.email);
                   $('#update_bg').val(data.bg);
                   $('#update_nid').val(data.nid_no);
                   $('#update_passport').val(data.passport_no);
                   $('#update_dob').val(data.dob);

                   if(data.access_id == 2)
                   {
                        $('#enableBTN').attr("hidden", false);
                        $('#restrictBTN').attr("hidden", true);
                   }
                   else if(data.access_id == 3)
                   {
                        $('#enableBTN').attr("hidden", true);
                        $('#restrictBTN').attr("hidden", false);
                   }
                   else{}
                }
                else {}
            }
        });
    }

    $('#updateModal').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('bs-id');
        LoadInformation(id);
    });

    // UPDATE ACCESS
    var updateAccess = function (id, data) {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/logins/update-user-access/"+id,
            method: "PUT",
            data: data,
            headers : {
                role : decryptLoginInfo.role_id,
            },

            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        LoadInformation($("#update_id").val());
                    }
                    else
                    {
                        alert("Something went wrong.\nTry again.");
                    }
                   
                }
                else {
                    var data = xhr.responseJSON;
                    alert("Something went wrong.\nTry again.");
                }
            }
        });
    }

    $("#restrictBTN").click(function () {
        var id = $("#update_login_id").val();
        var data = {
            access_id : '2',
        }
        updateAccess(id, data);
    });

    $("#enableBTN").click(function () {
        var id = $("#update_login_id").val();
        var data = {
            access_id : 3
        }
        updateAccess(id, data);
    });

    // UPDATE INFORMATION
    var validateUpdate= function() {
        var validate = true;

        if($.trim($('#update_name').val()).length <= 0)
        {
            validate = false;
            $('#update_name').addClass("is-invalid");
        }
        else
        {
            $("#update_name").removeClass("is-invalid");
        }

        if($.trim($('#update_email').val()).length <= 0)
        {
            validate = false;
            $('#update_email').addClass("is-invalid");
        }
        else
        {
            $("#update_email").removeClass("is-invalid");
        }

        if($.trim($('#update_contact').val()).length != 10)
        {
            validate = false;
            $('#update_contact').addClass("is-invalid");
        }
        else
        {
            $("#update_contact").removeClass("is-invalid");
        }

        if($.trim($("#update_nid").val()).length <= 0 && $.trim($("#update_passport").val()).length <= 0)
        {
            validate = false;
            $("#update_nid").addClass("is-invalid");
            $("#update_passport").addClass("is-invalid");
        }
        else
        {
            $("#update_nid").removeClass("is-invalid");
            $("#update_passport").removeClass("is-invalid");
        }

        if($.trim($("#update_dob").val()).length <= 0)
        {
            validate = false;
            $("#update_dob").addClass("is-invalid");
        }
        else
        {
            $("#update_dob").removeClass("is-invalid");
        }


        return validate;
    }

    var updateInformation = function (id, data) {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/consumers/update-consumer/"+id,
            method: "PUT",
            data: data,
            headers : {
                role : decryptLoginInfo.role_id,
            },

            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        alert("Information Updated.");
                        LoadInformation($("#update_id").val());
                        LoadAllVendor();
                    }
                    else
                    {
                        alert("Something went wrong.\nTry again.");
                    }
                   
                }
                else {
                    var data = xhr.responseJSON;
                    alert("Something went wrong.\nTry again.");
                }
            }
        });
    }
    
    $("#updateBTN").click(function () {
        if(validateUpdate())
        {
            var id = $("#update_id").val();

            var consumer_data = {
                name: $('#update_name').val(), 
                nid_no: $('#update_nid').val(), 
                passport_no: $('#update_passport').val(), 
                gender: $('#update_gender').val(), 
                dob: $('#update_dob').val(), 
                bg: $('#update_bg').val(), 
                contact_no: "+880" + $('#update_contact').val(),
            }

            if($.trim($("#update_nid").val()).length <= 0)
            {
                delete consumer_data.nid_no;
            }
            if($.trim($("#update_passport").val()).length <= 0)
            {
                delete consumer_data.passport_no;
            }

            updateInformation(id, consumer_data);
        }
    });
});