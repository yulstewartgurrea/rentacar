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
	$("#accountcustomerspage").hide();

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
	$("#carownerspage").hide();
	$("#carownersdetailspage").hide();
	$("#accountcustomerspage").hide();

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
	$("#carownerspage").hide();
	$("#cardetailspage").hide();
	$("#accountcustomerspage").hide();
}

function showshophomepage() {
	$("#accountpage").show();
	$("#homepage").hide();
	$("#shoppage").hide();
	$("#cardetailspage").hide();
	$("#cartpage").hide();
	$("#checkoutpage").hide();

}	

function showshophomepage2() {
	$("#accountpage").hide();
	$("#homepage").show();
	$("#shoppage").hide();
	$("#cardetailspage").hide();
	$("#cartpage").hide();
	$("#checkoutpage").hide();

}