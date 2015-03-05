var login = require("Login");	
var args = arguments[0] || {};
var _callBack = args._callBack || {};

$.get_places.open();

	var url = Alloy.Globals.dom + "search.php";
	var _data = {accessToken:login.getAccessToken(),
		type:"_invite",
		"mode":"get_places"
	};
		
	Ti.API.debug("team save data request" + JSON.stringify(_data));
 	var client = Ti.Network.createHTTPClient({ 		
 	 onload : function(e) {
 	 	 Ti.API.debug("team save data response " + this.responseText);
 	 	 var response = JSON.parse(this.responseText);
      	 if(response){
      	 	draw_places(response);
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
 		client.send(_data);


 function draw_places(places){
 	if(places.length === 1){
 		_callBack(places[0].pid);
 		$.get_places.close();
 		return;
 	}
 	$.please_wait.hide();
 	$.container.show();
 	for(var i=0;i<places.length;i++){
 		draw_place(places[i]);
 	}
 }
 
 function draw_place(place){
 		var c = Ti.UI.createView({
 			layout:"vertical",
 			height:Ti.UI.SIZE,borderRadius:2,
 			borderRadius:"4",place:place,bottom:10,
 			backgroundImage:"common/trans.png",
 			backgroundColor:"transparent"
 		});	
 		
 		var t = Ti.UI.createLabel({
 			text:place.name,
 			color:"#fff",
 			font:{
 				fontSize:24
 			},
 			height:Ti.UI.SIZE,
 			left:20,top:20,bottom:5,right:20
 		});
 		c.add(t);
 		
 		var v = Ti.UI.createLabel({
 			text:place.vicinity,
 			color:"#fff",opacity:0.7,
 			font:{
 				fontSize:16
 			},
 			height:Ti.UI.SIZE,
 			left:20,top:0,bottom:20,right:20
 		});
 		c.add(v);
 		
 		c.addEventListener("click",function(){
 			_callBack(place.pid);
 			$.get_places.close();
 		});
 		
 		$.main.add(c);
 }

 function cancel(){
 	login.logout();
 }
