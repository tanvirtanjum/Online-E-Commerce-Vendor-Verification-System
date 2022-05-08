$(document).ready(function () {
    $('#homeTab').attr("href", base_URL+"/views/public/home.html");

    function activeSection()
    {
        if(window.location.href == base_URL+"/views/public/home.html")
        {
            $('#homeTab').addClass("active");
        }
    }

    activeSection();
});