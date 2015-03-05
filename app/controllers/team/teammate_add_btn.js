var args = arguments[0] || {};


function onClick(){
	var a =  Alloy.createController("team/teamform",{_data:{},_place:args._place,_callBack:function(e){
		args._callBack(e);
	}});
}
