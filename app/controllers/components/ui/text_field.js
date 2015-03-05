var args = arguments[0] || {};
var _editable = true;


$.main.setPasswordMask(args.passwordMask || false);
$.main.setHintText(args._hintText);
if(args._value){
	$.main.setValue(args._value);
}

exports.getValue = function(){
	return $.main.getValue();
};

exports.setValue = function(val){
	$.main.setValue(val);
};

exports.setEditable = function(val){
	_editable = val;
	$.main.setEditable(val);
	if(val){
		$.main.setColor("#333");
	}else{
	  $.main.setColor("#ccc");	
	}
};

exports.setDirty = function(val){
	if(_editable){
		$.main.setColor("#990000");
	}
	
	var animation = Titanium.UI.createAnimation();
	animation.opacity = 0.3;
	animation.duration = 500;
	var animationHandler = function() {
  		animation.removeEventListener('complete',animationHandler);
  		animation.opacity = 1;
  		$.main.animate(animation);
	};
animation.addEventListener('complete',animationHandler);
$.main.animate(animation);
	
};


function onChange(e){
	  if(_editable){
	    $.main.setColor("#333");
	  }
		$.trigger('change', e);
}

function onBlur(){
	if($.main.value === "" && args._value){
	  $.main.setValue(args._value);
	}
}