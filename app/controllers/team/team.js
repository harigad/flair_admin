var login = require("Login");	
		var args = arguments[0] || {};
		var _callBack = args._callBack || {};
		var _pid = args._pid;
		var _loading = false;
		var team = [];
var _place;	

if(!_pid){
	 Alloy.createController("team/get_places",{_callBack:function(e){
		getTeam(e);
	}});
}else{
	getTeam(_pid);
}


function add(){
	var team = login.getTeam();
	var name = $.name.getValue();
	var mobile = $.mobile.getValue();
	mobile = isPhone(mobile);
	if(mobile && name!==""){
		for(var i=0;i<team.length;i++){
			if(team[i].mobile == mobile){
				error();
				return;
			}		
		}
		
		team.unshift({name:name,mobile:mobile});
		drawteam();
		save({action:"add",name:name,mobile:mobile});
	}else{
		error();
	}
}

function getTeam(pid){
$.header.setTitle("loading...please wait");
$.header.setHome();
$.header.open($.team);
	
	var url = Alloy.Globals.dom + "search.php";
	var _data = {accessToken:login.getAccessToken(),
		type:"_invite",
		pid:pid
	};
		
	Ti.API.debug("team save data request" + JSON.stringify(_data));
 	var client = Ti.Network.createHTTPClient({ 		
 	 onload : function(e) {
 	 	 Ti.API.debug("team save data response " + this.responseText);
 	 	 var response = JSON.parse(this.responseText);
      	 if(response){
      	 	_place = response.place;
      	 	team = response.team;
      	 	$.header.setTitle(_place.name,_place.vicinity);
      	 	drawteam();
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
}

function _refresh(e){
	team = e;
	drawteam();
}

function drawteam(){
	while($.teammates.children.length>0){
		$.teammates.remove($.teammates.children[0]);
	}

	var a =  Alloy.createController("team/teammate_add_btn",{_callBack:function(e){
		_refresh(e);
	},_place:_place});
	$.teammates.add(a.getView());

	var hideRemove = false;
    if(team.length  < 2 ){
    	hideRemove = true;
    }
  	for(var i=0;i<team.length;i++){
  		var t =  Alloy.createController("team/teammate",{_place:_place,_data:team[i],hideRemove:hideRemove,
  			_callBack:function(e){_refresh(e);}	
  		});
  		$.teammates.add(t.getView());
  	}
}

function removeTeammate(data){
	var team = login.getTeam();
		for(var i=0;i<team.length;i++){
  			if(team[i].mobile == data.mobile){
  				team.splice(i,1);
  			}
  		}
  		drawteam();
  		save(data);
}

exports.close = function(){
	$.profile.close();
};

function error(){
	$.btn.setText("add");
	
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
};

function isPhone(p) {
  var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
  var digits = p.replace(/\D/g, "");
  	if(digits.match(phoneRe)){
  	   return digits;
  	}else{
  	   return false;
  	} 
}
