$(document).ready(function () {
    $('#navbar').load(base_URL+"/views/layouts/_publicNavbar.html");
    $('#footer').load(base_URL+"/views/layouts/_commonFooter.html");


    // LOAD BUSINESS
    var LoadBusiness = function(credential){
        var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        decryptLoginInfo = JSON.parse(decryptLoginInfo);

        var str = "";
        $.ajax({
            url: api_base_URL+"/api/businesses/get-business/credential/"+credential,
            method: "GET",
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    
                    var data = xhr.responseJSON;

                    str += "<p class='h2'>"+data.name+"</p>";
                    str += "<p class='h4'>Location: "+data.address+"</p>";
                    str += "<p class='h6'>Verification Status: "+data.status_name+"</p>"
                   

                    $('#typer').html(str);
                }
                else 
                {
                    str += "<p class='h4'>Invalid Credential<br>Try Again.</p>";

                    $('#typer').html(str);
                }

                $('#viewModal').modal('show');
            }
        });
    }

    $('#search').keypress(function (e) {
        var key = e.which;
        if(key == 13)  // the enter key code
         {
           var credential = $('#search').val();
           LoadBusiness(credential);
         }
    });


});