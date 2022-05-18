$(document).ready(function () {
    $('#homeTab').attr("href", base_URL+"/views/public/home.html");
    $('#searchTab').attr("href", base_URL+"/views/public/search.html");

    function activeSection()
    {
        if(window.location.href == base_URL+"/views/public/home.html")
        {
            $('#homeTab').addClass("active");
        }

        if(window.location.href == base_URL+"/views/public/search.html")
        {
            $('#searchTab').addClass("active");
        }
    }

    activeSection();
});