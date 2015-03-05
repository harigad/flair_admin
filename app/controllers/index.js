var login = require("Login");
var nav;

exports.open = function(){
	$.index.open();
    $.home.init();
};

login.init(function(){
   
    Alloy.createController("team/team");
   // $.index.open();
   // $.home.init();
});

Ti.App.addEventListener("launchWindow",function(evt){
	//var win = Alloy.createController(evt.target,{_data:evt.data});
	//window.location = "/index.html#" + evt.target;	
});

