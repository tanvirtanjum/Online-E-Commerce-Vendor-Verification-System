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
            url: api_base_URL+"/api/consumers/get-all-consumers/unregistered",
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
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#updateModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-eye'></i> View</button></td>"+
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

                }
                else {}
            }
        });
    }

    $('#updateModal').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('bs-id');
        LoadInformation(id);
    });

    // ACCEPT/REJECT
    var acceptUser = function (id, data) {
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

    $("#acceptBTN").click(function () {
        var id = $("#update_login_id").val();
        var data = {
            access_id : '3',
        }
        acceptUser(id, data);
    });

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

    var deleteVendor = function (id) {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/consumers/delete-consumer/"+id,
            method: "DELETE",
            headers : {
                role : decryptLoginInfo.role_id,
            },

            complete: function (xhr, status) {
                if (xhr.status == 204) {
                    var data = xhr.responseJSON;

                    deleteLogin($("#update_login_id").val());                
                }
                else {
                    var data = xhr.responseJSON;
                    alert("Something went wrong.\nTry again.");
                }
            }
        });
    }

    $("#rejectBTN").click(function () {
        var id = $("#update_id").val();
        deleteVendor(id);
    });

    // ACCEPT ALL
    var acceptAllUser = function () {
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/logins/update-all-customer-access/accept",
            method: "PUT",
            headers : {
                role : decryptLoginInfo.role_id,
            },

            complete: function (xhr, status) {
                if (xhr.status == 200) {
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

    $("#acceptAllBTN").click(function () {
        acceptAllUser();
    });
});