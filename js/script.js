var mAngle = getcsstransform($(".containerScreen")), CtrlAngle = getcsstransform($("#perspective.rotated"));
var initial = 3000, count = initial, counter, timerBool = false; 
var myKeys = [65,90,69,82,84,89,85,73,79,80,81,83,68,70,71,72,74,75,76,77,87,88,67,86,66,78,97,98,99,100,101,102,103,104,105,32,8,38,37,40,39,20,16,27,96,13];
// myKeys = ['a','z','e','r','t','y','u','i','o','p','q','s','d','f','g','h','j','k','l','m','w','x','c','v','b','n','7','8','9','4','5','6','1','2','3',' ','Backspace','ArrowUp','ArrowLeft','ArrowDown','ArrowRight','Capslock','Shift','Escape','0','Enter'];


$('.block').mousedown(function(){
  	$(this).addClass('blockDown'); 
	writeThisText($(this).attr('id'));
	}).mouseup(function(){
	$(this).removeClass('blockDown');               
	}).mouseout(function(){
	$(this).removeClass('blockDown');              
});
$(document).keydown(function(e){	
	// console.log(e.key);
	// console.log(e.which);
	if(myKeys.includes(e.which)){		
		$('#case-' + e.key + "").addClass('blockDown');
		writeThisText($('#case-' + e.key + "").attr('id'));
		}else{
		return	
	};  
});
$(document).keyup(function(e){
	if(myKeys.includes(e.which)){
		$('#case-' + e.key + "").removeClass('blockDown'); 
		}else{
		return	
	}; 
});

function writeThisText(z){	
	if ($('#' + z + '').hasClass('toDel')){	
		var tmpToReceive = $('.toReceive').text();
		tmpToReceive = tmpToReceive.substring(0,tmpToReceive.length-1);	
		$('.toReceive').text(tmpToReceive);
	}
	else if ($('#' + z + '').hasClass('redScreen')){
		$('.theScreen').addClass('theRedScreen');
		if(timerBool == false){
			toVisible('#timer');
			$('.failureTxt').text('SYSTEM FAILURE');
			startTimer();
			timerBool = true;
			}else{
			changeAClass('.theScreen','theRedScreen','theBlueScreen');
			$(".toReceive").empty();
			toHidden('#timer','.toReceive','.codeTxt');
			$('.failureTxt').text(':( Your PC ran into a problem that it couldn\'t handle, and now it needs to restart.');
			
		}
		toVisible('.systemFailure');
	}
	else if ($('#' + z + '').hasClass('toSpace')){
		$('.toReceive').append(" ");
	}
	else if ($('#' + z + '').hasClass('toNothing')){
	}
	else if ($('#' + z + '').hasClass('toUpScreen')){
		if(mAngle.rotateX < -80){
			mAngle.rotateX = mAngle.rotateX + 1;
			$('.containerScreen').css('transform',"translateY(-250px)  translateZ(175px) translateX(135px) rotateX(" + mAngle.rotateX + "deg) translateZ(0px) rotateY(" + mAngle.rotateY + "deg)");
		}
	}
	else if ($('#' + z + '').hasClass('toDownScreen')){
		if(mAngle.rotateX > -90){
			mAngle.rotateX = mAngle.rotateX - 1;
			$('.containerScreen').css('transform',"translateY(-250px)  translateZ(175px) translateX(135px) rotateX(" + mAngle.rotateX + "deg) translateZ(0px) rotateY(" + mAngle.rotateY + "deg)");
		}
	}
	else if ($('#' + z + '').hasClass('toLeftScreen')){		
		if(mAngle.rotateY < 3){
			mAngle.rotateY = mAngle.rotateY + 1;
			$('.containerScreen').css('transform',"translateY(-250px)  translateZ(175px) translateX(135px) rotateX(" + mAngle.rotateX + "deg) translateZ(0px) rotateY(" + mAngle.rotateY + "deg)");
		}
	}
	else if ($('#' + z + '').hasClass('toRightScreen')){
		if(mAngle.rotateY > -3){
			mAngle.rotateY = mAngle.rotateY - 1;
			$('.containerScreen').css('transform',"translateY(-250px)  translateZ(175px) translateX(135px) rotateX(" + mAngle.rotateX + "deg) translateZ(0px) rotateY(" + mAngle.rotateY + "deg)");
		}
	}
	else if (($('#' + z + '').closest('.toWrite').length>0)&&($('#case-CapsLock').hasClass('CapsLockTrue'))){		
		$('.toReceive').append($('#' + z + '').text());
	}
	else if ($('#' + z + '').closest('.toWrite').length>0){		
		$('.toReceive').append($('#' + z + '').text());
	}
	else if ($('#' + z + '').hasClass('toExecute')){
		if ($(".toReceive").text().indexOf('clear') > -1){
			$(".toReceive").empty();
		}
		else if ($(".toReceive").text().indexOf('diary') > -1){
			$(".toReceive").empty();
			$(".toReceive").append('My diary');
		}
		else if ($(".toReceive").text().indexOf('stop') > -1){
			resetTimer();
		}
		else if ($(".toReceive").text().indexOf('animate') > -1){
			$('.screenAnimation').css('animation','kaboomboom 5s ease-in-out');
		}
	}
}

function timer() {
	if (count <= 0) {
		resetTimer();
		changeAClass('.theScreen','theRedScreen','theBlueScreen');
		$(".toReceive").empty();
		toHidden('#timer','.toReceive','.codeTxt');
		$('.failureTxt').text(':( Your PC ran into a problem that it couldn\'t handle, and now it needs to restart.');
		return;
	}
	count--;
	displayCount(count);
}
function displayCount(count) {
	var res = count / 100;
	document.getElementById("timer").innerHTML = res.toPrecision(count.toString().length) + " secs";
}
function startTimer() {
	counter = setInterval(timer, 10);
}
function resetTimer() {
	clearInterval(counter);
}
function stopTimer() {
	clearInterval(counter);
	count = initial;
	displayCount(count);
}
displayCount(initial);

$('.towerButton').on('click', function () {
	if($('.towerButton').hasClass('buttonOn')){		
        resetTimer();
		changeAClass('.towerButton','buttonOn','buttonOff');
		$(".toReceive").empty();		
		toHidden('.toReceive','.codeTxt');
		$('#theScreen').removeClass();
		$('#theScreen').addClass('theScreen theBlackScreen');		
	}
	else if($('.towerButton').hasClass('buttonOff')){
		changeAClass('.towerButton','buttonOff','buttonOn');		
		timerBool = false;
		$('.failureTxt').text('SYSTEM FAILURE');
		$(".toReceive").empty();
		toHidden('.systemFailure','#timer');
		toVisible('.toReceive','.codeTxt');
		$('#theScreen').removeClass();
		$('#theScreen').addClass('theScreen');		
	}
});

/* OTHER FUNCTIONS */
$( "#case-animation" ).on( "click", function() {
	if($('.containerScreen').hasClass('screenAnimation')){
		$('.screenAnimation').css('animation','');
		$('.containerScreen').removeClass('screenAnimation');
		}else{
	$('.containerScreen').addClass('screenAnimation'); }
});

$( ".zoomIt" ).on( "click", function() {
	if ($('body').hasClass('zoomZero')){
		changeAClass('body','zoomZero','zoomThree');
		}else if ($('body').hasClass('zoomOne')){
		changeAClass('body','zoomOne','zoomZero');
		}else if ($('body').hasClass('zoomTwo')){
		changeAClass('body','zoomTwo','zoomOne');
		}else if ($('body').hasClass('zoomThree')){
		changeAClass('body','zoomThree','zoomTwo');
		}else{
		$('body').addClass('zoomThree');  
	}
});

$( ".divCheck" ).on( "click", function() {
	$('#objects').addClass('objectsClick');
});
$( "#objects" ).on( "click", function() {
	$(this).removeClass('objectsClick');
});
$(document).on('input', '#rangeZ', function() {
	CtrlAngle.rotateZ = $('#rangeZ').val();
	CtrlAngle.rotateX = $('#rangeX').val();
	$('#perspective.rotated').css("transform",'translateX(-40px) rotateX(' + CtrlAngle.rotateX + 'deg) rotateZ(' + CtrlAngle.rotateZ + 'deg)');
});
$(document).on('input', '#rangeX', function() {
	CtrlAngle.rotateZ = $('#rangeZ').val();
	CtrlAngle.rotateX = $('#rangeX').val();
	$('#perspective.rotated').css("transform",'translateX(-40px) rotateX(' + CtrlAngle.rotateX + 'deg) rotateZ(' + CtrlAngle.rotateZ + 'deg)');
});

function changeAClass(a,b,c){	
	$(a).removeClass(b);
	$(a).addClass(c);
}
function toHidden() {
    for(var i=0; i<arguments.length; i++){
		// console.log(arguments[i] + " toHidden");
		$(arguments[i]).css('visibility', 'hidden');
	}
};
function toVisible(){
    for(var i=0; i<arguments.length; i++){		
		// console.log(arguments[i] + " toVisible");
		$(arguments[i]).css('visibility', 'visible');
	}
};

/* FUNCTION getcsstransform */

function getcsstransform(obj)
{
	var TType="undefined", rotateX = 0, rotateY = 0, rotateZ = 0;
	var ctrlRotateY = 0, ctrlRotateX = 0, ctrlRotateZ = -45;
	var isIE = /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent);
	var matrix = obj.css("-webkit-transform") ||
	obj.css("-moz-transform") ||
	obj.css("-ms-transform") ||
	obj.css("-o-transform") ||
	obj.css("transform");
	if (matrix!==undefined && matrix !== 'none')
	{
		// if matrix is 2d matrix
		TType="2D";
		if (matrix.indexOf('matrix(') >= 0)
		{
			var values = matrix.split('(')[1].split(')')[0];
			if (isIE)  //case IE
			{
				angle = parseFloat(values.replace('deg', STR_EMPTY));
			}else
			{
				values = values.split(',');
				var a = values[0];
				var b = values[1];
				var rotateZ = Math.round(Math.atan2(b, a) * (180 / Math.PI));
			}
		}else
		{
			// matrix is matrix3d
			TType="3D";
			var values = matrix.split('(')[1].split(')')[0].split(',');
			var sinB = parseFloat(values[8]);
			var b = Math.round(Math.asin(sinB) * 180 / Math.PI);
			var cosB = Math.cos(b * Math.PI / 180);
			var matrixVal10 = parseFloat(values[9]);
			var a = Math.round(Math.asin(-matrixVal10 / cosB) * 180 / Math.PI);
			var matrixVal1 = parseFloat(values[0]);
			var c = Math.round(Math.acos(matrixVal1 / cosB) * 180 / Math.PI);
			rotateX = a;
			rotateY = b;
			rotateZ = c;
		}
	}
	return  { TType: TType, rotateX: rotateX,  rotateY: rotateY,  rotateZ: rotateZ};
};		