// this is the main app.js file
// it contains logic and functionality that will need to be used on every page



$(function() {


  // tracl the categories folders
  // alert(_items);
  // document.getElementById("categories").innerHTML = items;

  // track the current category id to get items from
  var cCat = "";

  // set up the AJAX test request
  var r = new XMLHttpRequest();


  // Connect to the socket
  var socket = io();

  // get the URL of the application to test against
  var url = "http://"+((window.location.href).split("/"))[2]+"/";



  // get Main Content Data
  document.getElementById("loadmainnav").onclick = function(){
    // get the categories
    sendRequest("c?id=mainnav");
    r.onreadystatechange = showMainNav;
  }

  // Back Main Content Data
  // document.getElementById("backmainnav").onclick = function(){
  //   // get the categories
  //   sendRequest("c?id=backmainnav");
  // }

  $("#back").click(function(){
    target = $(this).attr("data-target");
    if (target=='main-nav') {
      return true;
    }
    return false;
  });


  // this will show the list of items that were grabbed from the folders
  function showMainNav(){
    if(r.responseText != ""){
      res = (r.responseText).split("]|[");
      $('#categories').animate({'opacity': 0}, 400, function(){
        $(this).animate({'opacity': 1}, 400);
        document.getElementById('categories').innerHTML = res[1];
        $('#back').animate({'opacity': 1}, 1000);
        $('#back').attr('data-target', 'main-nav');
        $('#back').attr('href', '/remoteplay');
      });
    }
  }



  $('#categories').on('click', '.mainitem', function() {
    id = $(this).attr("id");
    cCat = id;
    // set screensaver
    if (id=='screensaver') {
      sendRequest("screen?id=nav&cat="+id);
    } else {
      // get the sub-categories
      sendRequest("c?id=nav&cat="+id);
      r.onreadystatechange = showNav;
      $('#categories').animate({'opacity': 0}, 400, function(){
        $(this).hide();
        $('#category').animate({'opacity': 1}, 400);
        document.getElementById('categoryname').innerHTML = cCat;
        $('#categoryname').animate({'opacity': 0.4}, 400);
        $('#category').show();
      });
    }
  });



  // this will show the list of items that were grabbed from the sub-folders
  function showNav(){
    if(r.responseText != ""){
      res = (r.responseText).split("]|[");

      document.getElementById('category').innerHTML = res[1];
    }
  }




  $('#category').on('click', '.categoryitem ', function() {
    mediaType = $(this).attr("data-mediatype");
    id = $(this).attr("id");
    path = $(this).attr("data-path");
    cat = cCat + '/';
    if (path != '') {
      cat = cat + path;
    }
    sendRequest("play?s=general&c="+cat+"&t="+mediaType+"&id="+id);
    return false;
  });


  $('#category').on('click', '.backcategory ', function() {
    $('#category').animate({'opacity': 0}, 400, function(){
      $(this).hide();
      $('#categoryname').hide();
      $('#categories').show();
    });
    // get the categories
    sendRequest("c?id=mainnav");
    r.onreadystatechange = showMainNav;
  });




  // this function will actually send the request to the application for testing purposes
  function sendRequest(a){
    r.open("GET",url+a,true);
    r.send();
  }

});
