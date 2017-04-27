$(document).ready(function(){
	$("#showmain").click(function(){
		$("#main").show();
		$("#userprofile").hide();
		$("#addcar").hide();
		$("#tableforcars").hide();
		
	});

	$("#showuserprofile").click(function(){
		$("#main").hide();
		$("#userprofile").show();
		$("#addcar").hide();
		$("#tableforcars").hide();
	});

	$("#showaddcar").click(function(){
		$("#main").hide();
		$("#userprofile").hide();
		$("#addcar").show();
		$("#tableforcars").hide();
	});

	$("#showtableforcars").click(function(){
		$("#main").hide();
		$("#userprofile").hide();
		$("#addcar").hide();
		$("#tableforcars").show();
	});

});