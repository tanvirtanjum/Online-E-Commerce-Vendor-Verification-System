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
    // LOAD BUSINESS TYPE OPTIONS
    var LoadAllBusinessTypeOptions = function(){
        $.ajax({
            url: api_base_URL+"/api/business_types/get-all",
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    var str = '';

                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += '<option value="'+data[i].id+'">'+data[i].type_name+'</option>';
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#add_type").html(str);
                }
                else 
                {
                    str += "";
                    $("#add_type").html(str);
                }
            }
        });
    }
    LoadAllBusinessTypeOptions();

    // LOAD TABLE
    var LoadAllBusiness = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/businesses/get-all/owner_id/"+id,
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
                                        "<td>"+ data[i].type_name +"</td>"+
                                        "<td>"+ data[i].credential  +"</td>"+
                                        "<td>"+ data[i].status_name  +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-edit'></i> Edit</button></td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#table tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='6' align='middle'>NO DATA FOUND</td></tr>";
                    $("#table tbody").html(str);
                }
            }
        });
    }

    // LOAD PROFILE INFORMATION
    var LoadMyProfile = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/consumers/get-consumer/login_id/"+decryptLoginInfo.id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#my_user_id').val(data.id);
                   LoadAllBusiness(data.id);
                }
                else {}
            }
        });
    }

    LoadMyProfile();

    // REGISTRATION
    var validateRegistration= function() {
        var validate = true;

        if($.trim($('#add_name').val()).length <= 0)
        {
            validate = false;
            $('#add_name').addClass("is-invalid");
        }
        else
        {
            $("#add_name").removeClass("is-invalid");
        }

        if($.trim($('#add_address').val()).length <= 0)
        {
            validate = false;
            $('#add_address').addClass("is-invalid");
        }
        else
        {
            $("#add_address").removeClass("is-invalid");
        }

        if($.trim($('#add_contact').val()).length != 10)
        {
            validate = false;
            $('#add_contact').addClass("is-invalid");
        }
        else
        {
            $("#add_contact").removeClass("is-invalid");
        }


        return validate;
    }


    var InsertBusiness = function(data){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/businesses/insert-business",
            method: "POST",
            data : data,
            headers : {
                role : decryptLoginInfo.role_id,
            },

            complete: function (xhr, status) {
                if (xhr.status == 201) {
                    var data = xhr.responseJSON;

                    LoadMyProfile();
                }
                else 
                {
                    alert("This user already has an account.");
                }
            }
        });
    }

    $("#addBTN").click(function () {
        if(validateRegistration())
        {
            var data = {
                name: $('#add_name').val(),
                credential: "B" + Date.now(),
                address: $('#add_address').val(),
                emergency_contact: $('#add_contact').val(),
                owner_id: $('#my_user_id').val(),
                type_id: $('#add_type').val(),
            }

            InsertBusiness(data);
        }
    });
});