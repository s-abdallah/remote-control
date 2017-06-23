$(function() {
    var cCat = "";
    var r = new XMLHttpRequest();
    var socket = io();
    var url = "https://" + window.location.href.split("/")[2] + "/";
    document.getElementById("loadmainnav").onclick = function() {
        sendRequest("c?id=mainnav");
        r.onreadystatechange = showMainNav;
    };
    $("#back").click(function() {
        target = $(this).attr("data-target");
        if (target == "main-nav") {
            return true;
        }
        return false;
    });
    function showMainNav() {
        if (r.responseText != "") {
            res = r.responseText.split("]|[");
            $("#categories").animate({
                opacity: 0
            }, 400, function() {
                $(this).animate({
                    opacity: 1
                }, 400);
                document.getElementById("categories").innerHTML = res[1];
                $("#back").animate({
                    opacity: 1
                }, 1e3);
                $("#back").attr("data-target", "main-nav");
                $("#back").attr("href", "/remoteplay");
            });
        }
    }
    $("#categories").on("click", ".mainitem", function() {
        id = $(this).attr("id");
        cCat = id;
        if (id == "screensaver") {
            sendRequest("screen?id=nav&cat=" + id);
        } else {
            sendRequest("c?id=nav&cat=" + id);
            r.onreadystatechange = showNav;
            $("#categories").animate({
                opacity: 0
            }, 400, function() {
                $(this).hide();
                $("#category").animate({
                    opacity: 1
                }, 400);
                document.getElementById("categoryname").innerHTML = cCat;
                $("#categoryname").animate({
                    opacity: .4
                }, 400);
                $("#category").show();
            });
        }
    });
    function showNav() {
        if (r.responseText != "") {
            res = r.responseText.split("]|[");
            document.getElementById("category").innerHTML = res[1];
        }
    }
    $("#category").on("click", ".categoryitem ", function() {
        mediaType = $(this).attr("data-mediatype");
        id = $(this).attr("id");
        path = $(this).attr("data-path");
        cat = cCat + "/";
        if (path != "") {
            cat = cat + path;
        }
        sendRequest("play?s=general&c=" + cat + "&t=" + mediaType + "&id=" + id);
        return false;
    });
    $("#category").on("click", ".backcategory ", function() {
        $("#category").animate({
            opacity: 0
        }, 400, function() {
            $(this).hide();
            $("#categoryname").hide();
            $("#categories").show();
        });
        sendRequest("c?id=mainnav");
        r.onreadystatechange = showMainNav;
    });
    function sendRequest(a) {
        r.open("GET", url + a, true);
        r.send();
    }
});
