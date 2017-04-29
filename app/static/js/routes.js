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
	$("#updatecarpage").hide();
}

function showuserprofilepage() {
	$("#mainpage").hide();
	$("#userprofilepage").show();
	$("#addcarpage").hide();
	$("#carspage").hide();
	$("#addownerpage").hide();
	$("#updatecarpage").hide();
}

function showaddcarpage() {
	$("#mainpage").hide();
	$("#userprofilepage").hide();
	$("#addcarpage").show();
	$("#carspage").hide();
	$("#addownerpage").hide();
	$("#updatecarpage").hide();
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
	$("#updatecarpage").hide();
}

function showshophomepage() {
	$("#homepage").show();
	$("#shoppage").hide();
	$("#shoppage2").hide();
	$("#shoppage3").hide();
	$("#shoppage4").hide();
	$("#cardetailspage").hide();
	$("#cardetailspage2").hide();
	$("#cartpage").hide();
	$("#cartpage2").hide();
	$("#checkoutpage").hide();
	$("#checkoutpage2").hide();
	$("#checkoutpage3").hide();
}	