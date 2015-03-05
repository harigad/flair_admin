var login = require('Login');

$.header.setTitle("Dashboard");
$.header.setHome();

exports.init = function(){
	load();
};

function load(){
	var url = Alloy.Globals.dom + "index.php";
	var _data = {page:"home",uid:login.getUid(),sessionid:login.getSessionId()};
		
	Ti.API.debug("home data request" + JSON.stringify(_data));
 	var client = Ti.Network.createHTTPClient({ 		
 	 onload : function(e) {
 	 	 Ti.API.debug("home data response " + this.responseText);
 	 	 var response = JSON.parse(this.responseText);
      	 if(response){
      	 	draw(response);
      	 }
 	 },
 	 onerror: function(e){
 		 	
 	 }
 	});
 	
 	// Prepare the connection.
 		client.open("POST", url);
 	// Send the request.
 		client.send(_data);
}	
	