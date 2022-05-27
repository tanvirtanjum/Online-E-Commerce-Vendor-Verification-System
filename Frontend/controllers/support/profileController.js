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

    // LOAD PROFILE INFORMATION
    var LoadProfile = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/emergency_support_officers/get-officer/login_id/"+decryptLoginInfo.id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                
                   $('#name').html(data.name);
                   $('#sex').html(data.gender);
                   $('#contact').html(data.contact_no);
                   $('#email').html(data.email);
                   $('#bg').html(data.bg);
                   $('#nid').html(data.nid_no);
                   $('#dob').html(data.dob);
                   $('#avatar').attr('src', api_base_URL+'/api/downloads?path='+data.img_path+"");
                }
                else {}
            }
        });
    }

    LoadProfile();

    // UPDATE AVATAR
    var LoadLoginInfo = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        $.ajax({
            url: api_base_URL+"/api/logins/get-user/id/"+decryptLoginInfo.id,
            method: "GET",
            headers : {
                role : decryptLoginInfo.role_id,
            },
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                   var data = xhr.responseJSON;
                   $('#path').val(data.img_path);
                   $('#update_avatar').attr('src', api_base_URL+'/api/downloads?path='+data.img_path+"");
                }
                else {}
            }
        });
    }

    $("#updateAvatarModal").on('show.bs.modal', function() {
        LoadLoginInfo();
    });

    var UpdateImage = function(){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        var data = new FormData($('#uploadForm')[0]);

        $.ajax({
            url: api_base_URL+"/api/logins/update-user-image/"+decryptLoginInfo.id,
            method: "PUT",
            contentType: false,
            processData: false,
            cache: false,
            data: data,
            headers : {
                role : decryptLoginInfo.role_id,
                path: $('#path').val(),
            },
            complete: function (xhr, status) {
                console.log(xhr)
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    if(data.affectedRows >= 1)
                    {
                        alert("Image Updated.");
                    }
                    else 
                    {
                       alert("Something went wrong.\nTry again.");
                    }
                }
                else 
                {
                    alert("Something went wrong.\nTry again.");
                }
                LoadLoginInfo();
                LoadProfile();
            }
        });
    }

    $("#updateImageBTN").click(function () {
        UpdateImage();
    });


    // UPDATE PASSWORD
    
});