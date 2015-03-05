var user;
var main;
var _callBack;
var _errBack;
var fb = Ti.Facebook;
var login_screen;

	fb.addEventListener('login', function(e) {
		Ti.API.error("####################################" + fb.getAccessToken());
		if(fb.getAccessToken() && !user){
			setCookie("accessToken",fb.getAccessToken());
			onLogin(e);   
    	}else if(fb.getAccessToken() && user){
    		//do nothing
    	}else{
    	//show error
    	}
	});

exports.login = function(callBack){
	_login(callBack);
};

function _login(callBack){
	_callBack = callBack;
	fb.authorize();
}

exports.init = function(callBack){
	_init(callBack);
};

function _init(callBack){
	if(callBack){
		_callBack = callBack;
	}
	fb.appid = '201613399910723';
	fb.permissions = ['email'];
	fb.forceDialogAuth = true;
	 
	if(isLoggedIn()){
		_callBack();
	}else if(_getAccessToken()){
		onLogin();
	}else{
		show();
	}
	
}

exports.loggedIn = function(){
	return isLoggedIn();
};

function isLoggedIn(){
		if(_getAccessToken()){
			if(user && user.getId()){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}	
}

function _getAccessToken(){
	return fb.getAccessToken() || getCookie("accessToken");
}

exports.logout = function(){
    var d = new Date();
    d.setTime(d.getTime() - (24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = "accessToken=; " + expires;
	fb.logout();
	location.reload();
};

exports.getAccessToken = function(){
	return _getAccessToken();
};

function loadUser(_callBack){
	Ti.API.debug("login.loadUser");
	var User = require('User');
       user = new User("me",function(){
    	 	_callBack();
    	});
}

function onLogin(e){
	Ti.API.error("####################################" + fb.getAccessToken());
	loadUser(function(){
		_init(_callBack);
		setTimeout(function(){
			Ti.App.fireEvent("loggedin");
		},500);
		
	});
	
}	

function show(){
	Alloy.createController("signup/signup_search");
}

exports.getTeam = function(){
	if(user){
		return user.place.cast || [];
	}else{
		return [];
	}
};

exports.getUser = function(){
	if(user){
		return user;
	}else{
		var User = require('User');
	    user = new User(null,function(){},{});
	    return user;
	}
};

exports.setFeed = function(_flairs){
	Ti.API.info("login.setFeed");
	user.setFeed(_flairs);
};

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

