$(document).ready(function () {
    $('#navbar').load(base_URL+"/views/layouts/_publicNavbar.html");
    $('#footer').load(base_URL+"/views/layouts/_commonFooter.html");


    // LOAD BUSINESS
    var LoadBusiness = function(credential){
        // var decryptLoginInfo = CryptoJS.AES.decrypt(localStorage.loginInfo, '333');
        // decryptLoginInfo = decryptLoginInfo.toString(CryptoJS.enc.Utf8);
        // decryptLoginInfo = JSON.parse(decryptLoginInfo);

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
                    
                    if(data.verification_status_id == 1)
                    {
                        $('#logo').html('<span class="text-warning"><i class="fa-solid fa-certificate fa-4x fa-fade"></i></span>');
                    }
                    else if(data.verification_status_id == 2)
                    {
                        $('#logo').html('<span class="text-info"><i class="fa-solid fa-certificate fa-4x fa-fade"></i></span>');
                    }
                    else if(data.verification_status_id == 3)
                    {
                        $('#logo').html('<span class="text-success"><i class="fa-solid fa-certificate fa-4x fa-fade"></i></span>');
                    }
                    else if(data.verification_status_id == 4)
                    {
                        $('#logo').html('<span class="text-danger"><i class="fa-solid fa-certificate fa-4x fa-fade"></i></span>');
                    }
                    else{}
                }
                else 
                {
                    str += "<p class='h4'>Invalid Credential<br>Try Again.</p>";

                    $('#typer').html(str);
                    $('#logo').html('<span class="text-danger"></i><i class="fa-solid fa-triangle-exclamation fa-4x fa-fade"></i></span>');
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