$(document).ready(function () {
    $('#homeTab').attr("href", base_URL+"/views/public/home.html");

    $('#dashTab').attr("href", base_URL+"/views/police/dashboard.html");
    $('#listTab').attr("href", base_URL+"/views/police/request.html");
    $('#profileTab').attr("href", base_URL+"/views/police/profile.html");

    function activeSection()
    {
        if(window.location.href == base_URL+"/views/police/dashboard.html")
        {
            $('#dashTab').addClass("active");
        }

        if(window.location.href == base_URL+"/views/police/request.html")
        {
            $('#listTab').addClass("active");
        }

        if(window.location.href == base_URL+"/views/police/profile.html")
        {
            $('#moreTab').addClass("active");
            $('#profileTab').addClass("active");
        }
    }

    activeSection();

    /*var decryptLocal = function(secret) {
        var decryptLoginInfo = CryptoJS.AES.decrypt(secret, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        return decryptLoginInfo;
    }

    var userLogout = function () {
        // var decryptLoginInfo = decryptLocal(localStorage.getItem('loginInfo'));

        $.ajax({
            url: api_base_URL+"/api/logins/authenticated-user/logout",
            method: "GET",
            // headers: {
            //     role : decryptLoginInfo.role_id,
            // },
            
            complete: function (xhr, status) {
                if (xhr.status == 200) {

                    localStorage.clear();

                    window.location.href = base_URL+"/views/Public/SignIn.html";
                   
                }
                else {
                    alert(data['data']);
                }
            }
        });
    }*/

    $("#logoutTab").click(function () {
        // userLogout();
        window.location.href = base_URL+"/views/public/home.html";
    });
});