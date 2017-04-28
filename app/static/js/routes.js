// window.onload = function(){
//     $("#userprofile").hide();
//     $("#addcar").hide();
//     $("#tableforcars").hide();

// } 

function showmainpage() {
	$("#mainpage").show();
	$("#userprofilepage").hide();
	$("#addcarpage").hide();
	$("#carspage").hide();
	$("#addownerpage").hide();
}

function showuserprofilepage() {
	$("#mainpage").hide();
	$("#userprofilepage").show();
	$("#addcarpage").hide();
	$("#carspage").hide();
	$("#addownerpage").hide();
}

function showaddcarpage() {
	$("#mainpage").hide();
	$("#userprofilepage").hide();
	$("#addcarpage").show();
	$("#carspage").hide();
	$("#addownerpage").hide();
}

// function showtableforcars() {
// 	$("#main").hide();
// 	$("#userprofile").hide();
// 	$("#addcar").hide();
// 	$("#tableforcars").show();
// }

function showaddownerpage() {
	$("#mainpage").hide();
	$("#userprofilepage").hide();
	$("#addcarpage").hide();
	$("#carspage").hide();
	$("#addownerpage").show();
}