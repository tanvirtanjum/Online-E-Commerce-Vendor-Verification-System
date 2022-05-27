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

    var LoadProfile = function(){
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
                
                //    $('#name').html(data.name);
                //    $('#sex').html(data.sex);
                //    $('#rel').html(data.religion);
                //    $('#fname').html(data.father_name);
                //    $('#mname').html(data.mother_name);
                //    $('#contact').html(data.contact);
                //    $('#email').html(data.email);
                //    $('#bg').html(data.bg);
                //    $('#pra').html(data.present_address);
                //    $('#pea').html(data.permanent_address);
                //    $('#designation').html(data.designation_name);
                //    $('#salary').html(data.salary);
                //    $('#file').html(data.file_no);
                //    $('#avater').attr('src', api_base_URL+'/api/download?path='+data.img_path+"");
                }
                else {}
            }
        });
    }

    LoadProfile();
});