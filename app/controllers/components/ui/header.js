var login = require('Login');
var args = arguments[0] || {};
var isHome = false;

if(login.loggedIn()){
	$.logout.setText("logout");
	$.logo.setBackgroundImage("common/menu_40_40.png");
}

Ti.App.addEventListener("loggedin",function(){
	$.logout.setText("logout");
	$.logo.setBackgroundImage("common/menu_40_40.png");
});

function toggleLog(){
	if(login.loggedIn() == false){
	  login.login(function(){
	  	 Alloy.createController("team/team");
	  });	
	}else{
		login.logout();
	}
}

exports.setHome = function(){
	
	isHome = true;
};

exports.setTitle = function(title){
	$.title.setText(title);
};

exports.setMenu = function(arr){
	for(var i=0;i<arr.length;i++){
		var row =  Alloy.createController("components/ui/header_menu_item",{_data:arr[i],_i:i});
		$.menu.add(row.getView());
	}
};

// add children if there are any
_.each(args.children || [], function(child) {
    $.home.add(child);
});

$.home.height = Ti.UI.SIZE; 


//-----------------------------------------------------
var login = require('Login');
var parentWindow;

Ti.App.addEventListener("goHome",function(e){
	if(!isHome){
		parentWindow.close();
	}
});

exports.open = function(win,callBack){
	parentWindow = win;
	if(callBack){
		_callBack = callBack;
	}
	//Ti.App.fireEvent("openWindow",win);
	parentWindow.open();
};

exports.back = function(){
	goBack();
};

function goBack(){
	if(login.loggedIn()){
		 Alloy.createController("team/get_places",{_callBack:function(e){
			Alloy.createController("team/team",{_pid:e});
		}});
    	
    }
}

function goHome(){
	if(!isHome){
		if(!_callBack){
			Ti.App.fireEvent("goHome");
		}else{
			_callBack();
		}
	}
}