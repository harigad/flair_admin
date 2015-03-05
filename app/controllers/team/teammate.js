var args = arguments[0] || {};
var _remove = args._remove || {};
var _data = args._data;
var _callBack = args._callBack;
var _place = args._place;

$.name.setText(_data.name + " (" + _data.flairs + " flairs)");

$.photo.setBackgroundImage(_data.photo);

if(_data.role){
	$.role.setText(_data.role);
}else{
	$.role.setHeight(0);
}

if(!_data.inviteid && !_data.fbid){
	$.desc.setBackgroundColor("#990000");
	$.invite_btn.setBackgroundColor("#990000");
	$.desc.setText("status: invite not sent!");
	$.invite_btn.show();
}else if(_data.fbid){
	$.desc.setText("status: joined");
}

if(_data.inviteid){
	$.invite_btn.setBackgroundColor("#1782e6");
	$.desc.setText("status: invite sent and waiting");
	$.invite_label.setText("resend invite");
	$.invite_btn.show();
}

if(!_data.uid){
  $.btns.remove($.remove);	
}

if(args.hideRemove){
	$.remove.hide();
}

function edit(){
	var a =  Alloy.createController("team/teamform",{_place:_place,_data:_data,_callBack:function(e){
		_callBack(e);
	}});
}

function invite(){
	
}

function resend(){
	
}

function remove(){
	var dialog = Ti.UI.createAlertDialog({
    	buttonNames: ["Yes","Cancel"],
    	title: 'Remove ' + args._data.name + "?"
  	});
  	
  	dialog.addEventListener('click', function(e){
    if (e.index === 0){
      _remove(args._data);
    }else{
     dialog.close();	
    }
   });
  dialog.show();
}

function format_phone(phone){
 	return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
}