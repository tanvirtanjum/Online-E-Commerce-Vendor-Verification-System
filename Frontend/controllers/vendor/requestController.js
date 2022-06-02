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
                                        "<td>"+"<button type='button' data-bs-toggle='modal' data-bs-target='#viewModal' data-bs-id='"+data[i].id+"' class='btn btn-sm btn-primary'><i class='fas fa-eye'></i> View</button></td>"+
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
                emergency_contact: "+880"+$('#add_contact').val(),
                owner_id: $('#my_user_id').val(),
                type_id: $('#add_type').val(),
            }

            InsertBusiness(data);
        }
    });

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

                   $('#business_id').val(data.id);
                   $('#view_credential').val(data.credential);
                   $('#view_name').val(data.name);
                   $('#view_address').val(data.address);
                   $('#view_contact').val(data.emergency_contact);
                   $('#view_type').val(data.type_id);
                   $('#view_status').val(data.status_name);

                   if(data.verification_count == 1 && data.verification_status_id  == 4)
                   {
                        $("#reapplyBTN").attr('hidden', false);
                   }
                   else
                   {
                        $("#reapplyBTN").attr('hidden', true);
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

    // ADD FILE
    var addDocument = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        var data = new FormData($('#uploadForm')[0]);

        $.ajax({
            url: api_base_URL+"/api/documents/insert-document/business/"+id,
            method: "POST",
            contentType: false,
            processData: false,
            cache: false,
            data: data,
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 201) {
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
             }
        });
    }

    $("#uploadBTN").click(function () {
        addDocument($('#business_id').val());
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

    // REAPPLY
    var reApply = function(id){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/businesses/reapply/"+id,
            method: "PUT",
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
                
                // LoadBusiness();
            }
        });
    }

    $("#reapplyBTN").click(function () {
        reApply($('#business_id').val());
    });
    
});