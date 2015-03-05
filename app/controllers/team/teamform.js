var login = require("Login");	

var args = arguments[0] || {};
var _data = args._data || {};
var _callBack = args._callBack;
var _place = args._place;

$.teamform.open();

$.name.setValue(_data.name || "");
$.email.setValue(_data.email || "");
$.role.setValue(_data.role || "");

if(_data.fbid){
	$.name.setEditable(false);
	$.email.setEditable(false);
}else if(_data.inviteid){
	$.btn.setText("save and resend invite");
}else{
	$.btn.setText("save and send invite");
}

if(_data.access){
	$.container.remove($.remove);
}

function save(){
	var dirty = false;
	if($.name.getValue() === ""){
		$.name.setDirty();
		dirty = true;
	}
	if($.email.getValue() === "" || isEmail($.email.getValue()) === false){
		$.email.setDirty();
		dirty = true;
	}
	
	if(dirty === false){
	  var name = $.name.getValue();
	  name = name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	  send_to_server("add",name,$.email.getValue(),$.role.getValue());	
	}
}

function remove(){
	 $.container.hide();
	 $.photo.setBackgroundImage(_data.photo);
	 $.confirm_remove_text.setText("Do you really want to remove " + _data.name + " permanently from " + _place.name);
	 $.confirm_delete.show();
	 //send_to_server("delete");
}

function remove_confirm(){
	send_to_server("delete");
}

function remove_cancel(){
	 $.confirm_delete.hide();
	 $.container.show();
}

function cancel(){
	$.teamform.close();
}

function send_to_server(mode,name,email,role){
	$.container.hide();
	$.confirm_delete.hide();
	$.please_wait.show();
	
	var url = Alloy.Globals.dom + "search.php";
	var data = {accessToken:login.getAccessToken(),
		type:"_invite",
		mode:mode || "",
		pid:_place.pid || "",
		uid:_data.uid || "",
		name:name || "",
		email:email || "",
		role:role || ""
	};
		
	Ti.API.debug("team save data request" + JSON.stringify(data));
 	var client = Ti.Network.createHTTPClient({ 		
 	 onload : function(e) {
 	 	 Ti.API.debug("team save data response " + this.responseText);
 	 	 var response = JSON.parse(this.responseText);
      	 if(response){
      	 	_callBack(response.team);
      	 	$.teamform.close();
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



function isEmail(){
	return true;
}

