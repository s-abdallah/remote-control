// This is the server-side file of our mobile remote controller app.
// It initializes socket.io and a new express instance.
// Start it by running 'node app.js' from your terminal.


// Creating an express server
var express = require('express'),
	path = require("path"),
	fs = require("fs"),
	os = require('os'),
	http = require('http'),
	debug = true,
	jsonfile = require('jsonfile'),
	app = express();



	// This is needed if the app is run on heroku and other cloud providers:
	var port = process.env.PORT || 8080;

	// Initialize a new socket.io object. It is bound to
	// the express app, which allows them to coexist.
	var io = require('socket.io').listen(app.listen(port));

	// App Configuration

	// Make the files in the public folder available to the world
	app.use(express.static(__dirname + '/public'));


	// set the local path that this app runs from, either manually or dynamically
	var localPath = path.resolve();
	var file = localPath+'/public/data.json';



	// set up the listener for request being sent
	app.get('/remoteplay', function(req, res) {
		res.sendFile(localPath+"/remoteplay.html");
		// console.log(">> Entering manual control mode\n\r");
	});



	// retrieve the categories will go here
	app.get('/c', function(req, res) {
	  var id = req.query.id;

		if (id=='mainnav') {
			var cPath = localPath+"/public/_content/general";
			var cnt = 0;
			var catItems = "";
			fs.readdir(cPath,function(err,catFiles) {
			  if(err) {
			    throw err;
			  } else {
			    var catItems = "<div id=\"screensaver\" class=\"mainitem\" >screensaver</div>";
			    catFiles.forEach(function(file){
			      cnt++;
			      if(file.includes('.') == false) {
			        catItems += "<div id=\""+file.replace(" ", "")+"\" class=\"mainitem\" >"+file.replace(/_/g, " ")+"</div>";
			      }
			    });
					res.send(cnt+"]|["+catItems);
			  }
			});
		}	else if (id=='nav') {
			var category = req.query.cat;
			var cPath = localPath+"/public/_content/general/"+category;
			var files = [];
			// List all files in a directory in Node.js recursively in a synchronous fashion
     	var getFiles = function(dir, filelist) {
          var path = path || require('path');
          var fs = fs || require('fs'),
              files = fs.readdirSync(dir);
          filelist = filelist || [];
          files.forEach(function(file) {
              if (fs.statSync(path.join(dir, file)).isDirectory()) {
                  filelist = getFiles(path.join(dir, file), filelist);
              }
              else {
                  filelist.push(path.join(dir, file));
              }
          });
          return filelist;
      };
			getFiles(cPath, files);
			// get child path
			var getChilds = function(dir, extname, name, type, path) {
				gPath = dir.replace(cPath+"/", "");
				gPath = gPath.replace(fname+extname, "");
				var filename = "";
				var filelist = "";
				var cls = "";
				var child = gPath.split('/');
				if (child != '') {
					for (var i = 0; i < child.length; i++) {
						if (child[i] != '') {
							filename += "<span>"+child[i].toUpperCase()+"</span>"
						}
					}
					filename += "<span>"+name.toUpperCase()+"</span>"
					cls = "child";
				} else {
					filename = name.toUpperCase()
					cls = "";
				}
				filelist = "<li id=\""+path+"\" class=\"categoryitem "+cls+"\" data-mediatype=\""+type+"\" data-path=\""+gPath+"\">"+filename+"</li>";
				return filelist;
			};
			var cnt = 0;
	    var catItems = "";
			for (var i = 0; i < files.length; i++) {
				cnt++;
				if (path.extname(files[i]) != '') {
					var mediaType = (path.extname(files[i])==".webm"?"video":"image");
					if(mediaType == "video"){ // this is a video
						var fname = String(path.basename(files[i],".webm")).replace(/_/g," ");
						catItems += getChilds(files[i],".webm",fname,mediaType,path.basename(files[i],".webm"));
					}else{  // this is an image
						var fname = String(path.basename(files[i],".jpg")).replace(/_/g," ");
						catItems += getChilds(files[i],".jpg",fname,mediaType,path.basename(files[i],".jpg"));
					}
				}
			}
			catItems += "<li class=\"backcategory\">back</li>"
			res.send(cnt+"]|["+catItems);
		}
	});

	// change content
	app.get('/play', function(req, res) {
		if((req.query.s && req.query.s != "") && (req.query.c && req.query.c != "") && (req.query.id && req.query.id != "")){
			var s = req.query.s;
			var c = req.query.c;
			var t = req.query.t;
			var id = req.query.id;
			var showMe = "";
			switch(t){    // determine what type of media is being requested
				case "image":   // if we are trying to show an image
					showMe = "<img src=\"_content/"+s+"/"+c+id+".jpg\" alt=\""+s+" "+c+" "+id+"\" style=\"width: 100vw;\" />";
					break;
				case "video":   // if we are trying to show a video (webm only!!)
					//clearTimeout(timer);    // turn off the timer ONLY for videos!!!!!!
					showMe = "<video controls=\"true\" width=\"100%\" autoplay loop><source src=\"_content/"+s+"/"+c+id+".webm\" type=\"video/webm\"></video>";
					break;
			}
			io.emit('screensaver', {
				access: false
			});
			io.emit('change-content', {
				access: true,
				show: showMe,
				type: t,
				id: 'contentarea'
			});

			// save data
			url = "play?s=general&c="+c+"&t="+t+"&id="+id;
			var obj = {call: url}
			jsonfile.writeFile(file, obj, function (err) {
			  console.error(err)
			});

		} else {  // put application into slider mode
			io.emit('change-content', {
				access: false
			});
			io.emit('screensaver', {
				access: true,
				id: 'screensaver'
			});
			var obj = {call: false}
			jsonfile.writeFile(file, obj, function (err) {
			  console.error(err)
			});
		}
		// res.end("ok");  // send ok that the event took place
	});



	// change content
	app.get('/screen', function(req, res) {
		if((req.query.id && req.query.id != "")){
			id = req.query.id;
			cat = req.query.cat;
			io.emit('change-content', {
				access: false
			});
			io.emit('screensaver', {
				access: true,
				show: cat,
				id: 'screensaver'
			});
			var obj = {call: false}
			jsonfile.writeFile(file, obj, function (err) {
			  console.error(err)
			});
		}
	});



	// This is a secret key that prevents others from opening your presentation
	// and controlling it. Change it to something that only you know.

	var secret = 'neodev';

	// Initialize a new socket.io application

	var presentation = io.on('connection', function (socket) {

		// A new client has come online. Check the secret key and
		// emit a "granted" or "denied" message.

		socket.on('load', function(data){

			socket.emit('access', {
				access: (data.key === secret ? "granted" : "denied")
			});

		});


		// Clients send the 'slide-changed' message whenever they navigate to a new slide.
		socket.on('slide-changed', function(data){

			// Check the secret key again

			if(data.key === secret) {

				// Tell all connected clients to navigate to the new slide

				presentation.emit('navigate', {
					hash: data.hash
				});
			}

		});





	});




console.log('Your presentation is running on http://localhost:' + port);




// get the IP address of the server
if(debug === true){
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for(var k in interfaces){
    for(var k2 in interfaces[k]){
      var address = interfaces[k][k2];
      if(address.family === 'IPv4' && !address.internal){
        addresses.push(address.address);
      }
    }
  }
  process.stdout.write('\033c');  // clear the console each time we start the application
}


// this will start the screensaver either after a timeout OR manually
startSlider = function(){
  clearTimeout(timer);    // clear the timeout just in case
  screensaver = true;
  console.log(">> Entered slideshow\n\r");
  $("#ipaddress").html("Connect: "+addresses+":3000/?remoteplay");    // set the ip on the screen for easy use
  $("#contentarea").fadeOut(250,function(){
    $("#slidesarea").fadeIn(250,function(){

    });
  });
}





// change the content area to show what has been requested by the system
// a  = the asset to show
// b = the type of asset we are showing
changeContent = function(a,b){

	io.sockets.on('connection', function (socket) {

		socket.on('load', function(data){

			socket.emit('content', {
				content: abdallah
			});

		});

	});

	// clearTimeout(timer);
  // $("#contentarea").animate({
  //   opacity:0.0
  // },250,function(){
  //   $("#contentarea").empty().html(a);
  //   $("#contentarea").animate({
  //     opacity:1.0
  //   },250,function(){
  //     if(b != "video"){
  //       timer = setTimeout(function(){startScreensaver();},timerDelay); // reset timer for 5 minutes
  //     }
  //   });
  // });
}
