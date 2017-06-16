$(function() {

	// Initialize the Reveal.js library with the default config options
	// See more here https://github.com/hakimel/reveal.js#configuration

	Reveal.initialize({
		history: true		// Every slide will change the URL
	});

	// Connect to the socket

	var socket = io();

	// Variable initialization

	var form = $('form.login');
	var secretTextBox = form.find('input[type=text]');
	var presentation = $('.reveal');


	var key = "", animationTimeout;

	// When the page is loaded it asks you for a key and sends it to the server

	form.submit(function(e){

		e.preventDefault();

		key = secretTextBox.val().trim();

		// If there is a key, send it to the server-side
		// through the socket.io channel with a 'load' event.

		if(key.length) {
			socket.emit('load', {
				key: key
			});
		}

	});

	// The server will either grant or deny access, depending on the secret key

	socket.on('access', function(data){

		// Check if we have "granted" access.
		// If we do, we can continue with the presentation.


		if(data.access === "granted") {

			// Unblur everything
			presentation.removeClass('blurred');

			form.hide();

			var ignore = false;

			$(window).on('hashchange', function(){

				// Notify other clients that we have navigated to a new slide
				// by sending the "slide-changed" message to socket.io

				if(ignore){
					// You will learn more about "ignore" in a bit
					return;
				}

				var hash = window.location.hash;

				socket.emit('slide-changed', {
					hash: hash,
					key: key
				});

			});

			socket.on('navigate', function(data){

				// Another device has changed its slide. Change it in this browser, too:

				window.location.hash = data.hash;

				// The "ignore" variable stops the hash change from
				// triggering our hashchange handler above and sending
				// us into a never-ending cycle.

				ignore = true;

				setInterval(function () {
					ignore = false;
				},100);

			});

		}
		else {

			// Wrong secret key

			clearTimeout(animationTimeout);

			// Addding the "animation" class triggers the CSS keyframe
			// animation that shakes the text input.

			secretTextBox.addClass('denied animation');

			animationTimeout = setTimeout(function(){
				secretTextBox.removeClass('animation');
			}, 1000);

			form.show();
		}

	});


	var timer = "",
	delay = 50000;

	socket.on('change-content', function(data) {
		access = data.access;
		if (access==true) {
			showMe = data.show;
			type = data.type;
			changeContent(showMe,type);  // pass the requested content to the content changer!!
			$("#contentarea").fadeIn(250,function(){
				$("#screensaver").fadeOut(250);
			});
		}
	});


	changeContent = function(a,b){
	  clearTimeout(timer);
	  $("#contentarea").animate({
	    opacity:0.0
	  },250,function(){
	    $("#contentarea").empty().html(a);
	    $("#contentarea").animate({
	      opacity:1.0
	    },250,function(){
	      if(b != "video"){
	        timer = setTimeout(function(){startScreensaver();},delay); // reset timer for 5 minutes
	      }
	    });
	  });
	}


	socket.on('screensaver', function(data) {
		access = data.access;
		if (access==true) {
			$("#contentarea").hide();
			$("#screensaver").show();
			$("#screensaver").fadeIn(250,function(){
				$("#contentarea").fadeOut(250);
			});
		}
	});




});
