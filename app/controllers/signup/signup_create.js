var login = require("Login");
var args = arguments[0] || {};
var _data = args._data;
//$.header.setTitle(args._data.name);
$.signup_create.open();

$.address.setText(_data.formatted_address);

function setRegion(){
	$.mapview.region = {latitude:_data.geometry.location.lat, longitude:_data.geometry.location.lng, latitudeDelta:0.002, longitudeDelta:0.002};
	
	var marker = Titanium.Map.createAnnotation({
    latitude:_data.geometry.location.lat,
    longitude:_data.geometry.location.lng,
    title:_data.name,
    pincolor:Titanium.Map.ANNOTATION_RED,
    animate:true
	});
	
	//$.mapview.annotations = [marker];
	
}


function create(){
  login.login(function(){
  	process();
  });
}	
function process(){
	var url = Alloy.Globals.dom + "search.php";
	var data = {accessToken:login.getAccessToken(),
		mode:"signup",
		type:"_invite",
		place_id:_data.place_id
	};
		
	Ti.API.debug("team save data request" + JSON.stringify(data));
 	var client = Ti.Network.createHTTPClient({ 		
 	 onload : function(e) {
 	 	 Ti.API.debug("team save data response " + this.responseText);
 	 	 var response = JSON.parse(this.responseText);
      	 if(response.status){
      	   Alloy.createController("team/team");
      	 }else{
      	 	//show appropriate error
      	 }
 	 },
 	 onerror: function(e){
 		//show appropriate error
 	 }
 	});
 	
 	// Prepare the connection.
 		client.open("POST", url);
 	// Send the request.
 		client.send(data);
}

function showError(){
	$.login_btn.setText("JOIN");
	
	var animation = Titanium.UI.createAnimation();
	animation.opacity = 0.3;
	animation.duration = 300;
	var animationHandler = function() {
  		animation.removeEventListener('complete',animationHandler);
  		animation.opacity = 1;
  		$.main.animate(animation);
	};
animation.addEventListener('complete',animationHandler);
$.main.animate(animation);
}

function isPhone(p) {
  var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  var digits = p.replace(/\D/g, "");
  return (digits.match(phoneRe) !== null);
}

function cancel(){
	$.signup_create.close();
}
