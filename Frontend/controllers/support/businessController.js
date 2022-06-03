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

    // LOAD VERIFICATION STATUS OPTIONS
    var LoadAllVerificationStatusOptions = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/verification_status/get-all",
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    var str = '<option value="0">View All</option>';

                    if(data.length > 0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            str += '<option value="'+data[i].id+'">'+data[i].status_name+'</option>';
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#filter").html(str);
                }
                else 
                {
                    str += "";
                    $("#filter").html(str);
                }
            }
        });
    }
    LoadAllVerificationStatusOptions();

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

                    $("#view_type").html(str);
                }
                else 
                {
                    str += "";
                    $("#view_type").html(str);
                }
            }
        });
    }
    LoadAllBusinessTypeOptions();

    // LOAD POLICE OPTIONS
    var LoadAllBusinessTypeOptions = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/polices/get-all-police/active",
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
                            str += '<option value="'+data[i].id+'">'+data[i].name+'</option>';
                        }
                    }
                    else
                    {
                        str += "";
                    }

                    $("#view_police").html(str);
                }
                else 
                {
                    str += "";
                    $("#view_police").html(str);
                }
            }
        });
    }
    LoadAllBusinessTypeOptions();

    // LOAD TABLE
    var LoadAllBusiness = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/businesses/get-all",
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
    LoadAllBusiness();

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

    // LOAD BUSINESS
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

                   if(data.verification_status_id  == 1)
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

    // ASSIGN POLICE
    var AssignPolice = function(id, data){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/businesses/assign/"+id,
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
                LoadAllBusiness();
                
                // LoadBusiness();
            }
        });
    }

    $("#assignBTN").click(function () {
        var data = {
            verification_officer_id: $('#view_police').val()
        }
        AssignPolice($('#business_id').val(), data);
    });

    // FILTER TABLE
    var LoadFilterBusiness = function(status){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/businesses/get-all/status/"+status,
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


    $('#filter').on('change', function () {
        if($('#filter').val() == 0)
        {
            LoadAllBusiness();
        }
        else
        {
            LoadFilterBusiness($('#filter').val());
        }
    });

    // FILTER TABLE
    var LoadSearchBusiness = function(key){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/businesses/get-all/key/"+key,
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
            LoadSearchBusiness($("#search").val());
        }
        else
        {
            LoadAllBusiness();
        }
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

});