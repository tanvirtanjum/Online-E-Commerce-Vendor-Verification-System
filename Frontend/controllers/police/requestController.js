$(document).ready(function () {
    $('#navbar').load(base_URL+"/views/layouts/_policeNavbar.html");
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

        if(decryptLoginInfo.role_id == 2) 
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
                    $("#view_type").html(str);
                }
                else 
                {
                    str += "";
                    $("#add_type").html(str);
                    $("#view_type").html(str);
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
            url: api_base_URL+"/api/businesses/get-all/verification_officer/"+id,
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
                                        "<td>"+ data[i].cus_name +"</td>"+
                                        "<td>"+ data[i].name +"</td>"+
                                        "<td>"+ data[i].type_name +"</td>"+
                                        "<td>"+ data[i].credential  +"</td>"+
                                        "<td>"+ data[i].status_name  +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#viewModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-eye'></i> View</button></td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='7' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#table tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='7' align='middle'>NO DATA FOUND</td></tr>";
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
            url: api_base_URL+"/api/polices/get-police/login_id/"+decryptLoginInfo.id,
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

    // LOAD BUSINESS
    var LoadBusinessDocuments = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/documents/get-all/business/"+id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;
                    var str = '';
                    var sl = 1;
                    if(data.length > 0 && data[0].file_path != '')
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += "<tr>"+
                                        "<th>"+ sl + "</th>"+
                                        "<td>"+ data[i].path.slice(29) +"</td>"+
                                        "<td>"+ '<a class="btn btn-primary btn-sm" href="'+api_base_URL+'/api/download?path='+data[i].file_path+'" target="_blank" role="button" download><i class="fas fa-download"></i> Download</a>' +"</td>"+
                                        "<td>"+ "<button type='button' data-bs-toggle='modal' data-bs-target='#deleteFileModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-danger'><i class='fas fa-trash-alt'></i> Delete</button>" +"</td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                    }

                   $("#file_table tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                    $("#file_table tbody").html(str);
                }
            }
        });
    }

    var LoadBusiness = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/businesses/get-business/"+id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                    var data = xhr.responseJSON;

                    $('#avatar').attr('src', api_base_URL+'/api/downloads?path='+data.img_path+"");
                    $('#b_name').html(data.cus_name);
                    $('#b_email').html(data.email);
                    $('#b_contact').html(data.contact_no);

                   $('#business_id').val(data.id);
                   $('#view_credential').val(data.credential);
                   $('#view_name').val(data.name);
                   $('#view_address').val(data.address);
                   $('#view_contact').val(data.emergency_contact);
                   $('#view_type').val(data.type_id);
                   $('#view_status').val(data.status_name);
                   $('#count').val(data.verification_count);

                   if(data.verification_status_id  == 2)
                   {
                        $("#section").attr('hidden', false);
                   }
                   else
                   {
                        $("#section").attr('hidden', true);
                   }

                   LoadBusinessDocuments(id);
                }
                else 
                {
                    
                }
            }
        });
    }

    $('#viewModal').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('bs-id');
        LoadBusiness(id);
    });

    // LOAD DOCUMENT
    var LoadDocumentByID = function LoadFileByID(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        var data;

        $.ajax({
            url: api_base_URL+"/api/documents/get-document/"+id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    data = xhr.responseJSON;

                    $('#fileid').val(data.id);
                    $('#filepath').val(data.path.toString());
                    $('#filename').html(data.path.slice(29));
                }
            }
        });
    }

    $('#deleteFileModal').on('show.bs.modal', function(e) {
        var id = $(e.relatedTarget).data('bs-id');
        LoadDocumentByID(id);
    });
    
    // DELETE DOCUMENT
    var DeleteFileByID = function(id, path){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/documents/delete-document/id/"+id,
            method: "DELETE",
            headers : {
                role : decryptLoginInfo.role_id,
                path: path,
            },
            complete: function (xhr, status) {
                LoadBusiness($('#business_id').val());
            }
        });
    }

    $("#deletefileBTN").click(function () {
        DeleteFileByID($('#fileid').val(), $('#filepath').val());
    });

    // VERIFICATION
    var VerifyBusiness = function(id, data){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/businesses/verify/"+id,
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
                        
                    }
                    else 
                    {
                        alert("Something went wrong.");
                    }
                }
                else 
                {
                   alert("Something went wrong.");
                }

                LoadBusiness(id);
                LoadMyProfile();
                
                // LoadBusiness();
            }
        });
    }

    $("#verifyBTN").click(function () {
        var count = parseInt($('#count').val());

        var data = {
            verification_status_id: 3,
            verification_count: ++count,
        }
        VerifyBusiness($('#business_id').val(), data);
    });

    $("#rejectBTN").click(function () {
        var count = parseInt($('#count').val());

        var data = {
            verification_status_id: 4,
            verification_count: ++count,
        }
        VerifyBusiness($('#business_id').val(), data);
    });

    // SEARCH
    // LOAD TABLE
    var LoadAllBusinessByKey = function(id, key){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/businesses/get-all/police/"+id+"/key/"+key,
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
                                        "<td>"+ data[i].cus_name +"</td>"+
                                        "<td>"+ data[i].name +"</td>"+
                                        "<td>"+ data[i].type_name +"</td>"+
                                        "<td>"+ data[i].credential  +"</td>"+
                                        "<td>"+ data[i].status_name  +"</td>"+
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#viewModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-eye'></i> View</button></td>"+
                                "</tr>";
                            sl++;
                        }
                    }
                    else
                    {
                        str += "<tr><td colspan='7' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#table tbody").html(str);
                }
                else 
                {
                    str += "<tr><td colspan='7' align='middle'>NO DATA FOUND</td></tr>";
                    $("#table tbody").html(str);
                }
            }
        });
    }

    $("#search").on("keyup change",function(){
        if($.trim($("#search").val()).length > 0)
        {
            LoadAllBusinessByKey($('#my_user_id').val(), $("#search").val());
        }
        else
        {
            LoadMyProfile();
        }
    });
});