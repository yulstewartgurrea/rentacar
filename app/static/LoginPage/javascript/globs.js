//define functions and global variables here...
var siteloc = "http://localhost/Hygeia";
var scriptloc = "/scripts/";

$(document).ready(function () {
    jQuery.validator.addMethod("lettersonly", function (value, element) {
		return this.optional(element) || /^[a-z\s]+$/i.test(value);
	}, "Must be composed of letters only."); 

	jQuery.validator.addMethod("valuenotequals", function (value, element, arg) {
	  	return arg != value;
	}, "This field is required.");


    $('#form-signup').validate({
        rules: {
            username: {
                minlength: 5,
                maxlength: 15,
                required: true,
                remote: {
			        url: siteloc + scriptloc + "checkuser.py",
			        data: {username: function() {
			        	return $("#username").val();}
			        }
				}
            },
			email: {
				required: true,
				email: true,
				remote: {
                	url: siteloc + scriptloc + "checkemail.py",
			        data: {email: function() {
			        	return $("#email").val();}
			        }
                }
			},
            password: {
            	required: true,
                minlength: 5,
                maxlength: 15
            },
			cpassword: {
				required: true,
				equalTo: "#password"
			},			
        },
        messages: {
		    username: {
		        remote: "Username already exists."
		    },
		    email: {
		        remote: "Email is already in use."
		    }
		},
        highlight: function (element) {
            $(element).closest('.controls').addClass('has-error');
        },
        success: function (element) {
            $(element).closest('.controls').removeClass('has-error');
        }
    });
	$('#form-userinfo').validate({
        rules: {
            fullname: {
                minlength: 3,
                maxlength: 25,
                required: true,
                lettersonly: true
            },
            month: {
                required: true,
                valuenotequals: "00"
            },
			day: {
                required: true,
                valuenotequals: "00"
            },
			year: {
                required: true,
                valuenotequals: "00"
            },	
			gender: {
				required: true
			},
        },
        errorPlacement: function(error, element) {
            if (element.attr("type") == "radio") {
                error.insertAfter("#genderrow");
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element) {
            $(element).closest('.controls').addClass('has-error');
        },
        success: function (element) {
            $(element).closest('.controls').removeClass('has-error');
        }
    });
	$('#form-userrecord').validate({
        rules: {
            height: {
                minlength: 2,
                maxlength: 25,
                required: true,
                digits: true
            },
            weight: {
                minlength: 2,
                maxlength: 25,
                required: true,
                digits: true
            },
		 },
        highlight: function (element) {
            $(element).closest('.controls').addClass('has-error');
        },
        success: function (element) {
            $(element).closest('.controls').removeClass('has-error');
        }
    });
});

function logincollapse() {
	if ($("#loginuser").val() && $("#loginpass").val()) {
		$('#LogInCollapse').collapse({
			toggle: false
		});
		userlogin();
	}
	else {
		$('#LogInCollapse').collapse('toggle');
	}
}

function userlogin() {
	/*if (!$("#rememberme").val() == "true") {
		setCookie("user", $("#loginuser").val());
		setCookie("pass", $("#loginpass").val())
	} */
  $.ajax({
      url: siteloc + scriptloc + "login.py",
      data: {username:$("#loginuser").val(), password:$("#loginpass").val()},
      dataType: 'json',
	  async: true,
      success: function (res) {					
				if (res[0] == true) {				
					sessionStorage.id = res[1]								
				    console.log("Successfully logged in!");
					$('#login').prop('disabled',true);
					$('#loginuser').prop('disabled',true);
					$('#loginpass').prop('disabled',true);
					//alert("Successfully logged in!");
					window.location = "http://localhost/Hygeia/dashboard/index.html";
				} else {
				
					console.log("Invalid login details.");
					$("#LogInOutput").html("Invalid login details.");
				}		
				
            }
    });
}

function adduser() {
  $.ajax({
      url: siteloc + scriptloc + "adduser.py",
      data: {username:$("#username").val(), password:$("#password").val(), email:$("#email").val()},
      dataType: 'json',
	  async: true,
      success: function (res) {	
				if (typeof(Storage) != "undefined") {
					sessionStorage.id = res;
				} else {
					console.log("Sorry, your browser does not support Web Storage.");
				}
				console.log("Successfully registered.");          
            }
    });
	$('#register').prop('disabled',true);
	$('#username').prop('disabled',true);
	$('#email').prop('disabled',true);
	$('#password').prop('disabled',true);
	$('#cpassword').prop('disabled',true);
	$('#RegisterTab a[href="#PersonalInfo"]').tab('show');
	$('#RegisterTab a[href="#UserAccount"]').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});
	$('#RegisterTab a[href="#PersonalInfo"]').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});
}

function loadProfile()
{
  window.location = "http://localhost/Hygeia/dashboard/index.html";
  
  $.ajax({
      url:  "http://localhost/Hygeia/" + "getpersonalinfo.py",  // EDIT THIS WHEN TRANSFERRING DASHBOARD TO HYGEIA MAIN FOLDER
      data: {userID:sessionStorage.id},
      dataType: 'json',
      success: function (res) {
				alert(res)
				var agebracket = "Your bracket is " + res[0][5];
                  var healthstatus = "You are " + res[0][3];
                  var gender = "You are " + sessionStorage.gender;

                  $("#AgeStats").html(agebracket);
                  $("#ClassStats").html(healthstatus);
                  $("#GenderStats").html(gender);
              }
    });
  	$('#Stats').collapse('show');
	$('#RegisterTab a[href="#PlanGenerator"]').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});
}

function setpersonalinfo() {
  sessionStorage.gender = $('input:radio[name=gender]:checked').val();
  $.ajax({
		url: siteloc + scriptloc + "setpersonalinfo.py",
		data: {userID:sessionStorage.id, 
			fullname:$("#fullname").val(),
			birthday:$("#year").val() + "-" + $("#month").val() + "-" + $("#day").val(),
			gender:sessionStorage.gender}, 
		async: true,
		dataType: 'json',
		success: function (res) {
					console.log("Successfully added personal info.");
              }
    });
	$('#save').prop('disabled',true);
	$('#fullname').prop('disabled',true);
	$('#month').prop('disabled',true);
	$('#day').prop('disabled',true);
	$('#year').prop('disabled',true);
	$('#gender').prop('disabled',true);
	$('#RegisterTab a[href="#HealthStats"]').tab('show');
	$('#RegisterTab a[href="#HealthStats"]').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});
}

function fetchprogresshistoryof() {
  $.ajax({
      url: siteloc + scriptloc + "getprogressrecord.py",
      data: {userID:sessionStorage.id},
      dataType: 'json',
      success: function (res) {
                  var agebracket = res[0][5];
                  var healthstatus = res[0][3];
                  var gender = sessionStorage.gender;

                  $("#AgeStats").html(agebracket);
                  $("#ClassStats").html(healthstatus);
                  $("#GenderStats").html(gender);
              }
    });
  	$('#Stats').collapse('show');
	$('#RegisterTab a[href="#PlanGenerator"]').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});
}

function addprogressrecord() {
  $.ajax({
		url: siteloc + scriptloc + "setprogressrecord.py",
		data: {userID:sessionStorage.id, 
			height:$("#height").val(), 
			weight:$("#weight").val()},
		async: true,
		dataType: 'json',
		success: function (res) {
					console.log("Successfully added progress record.");
					fetchprogresshistoryof();
              }
    });
  	
	$('#formulate').prop('disabled',true);
	$('#height').prop('disabled',true);
	$('#weight').prop('disabled',true);
}

function set_personalfitnessplan(id, personalDietPlan, personalExercisePlan) {
  $.ajax({
      url: siteloc + scriptloc + "personalfitnessplan.py",
	  data: {id: p_id, personalDietPlan: p_personalDietPlan, personalExercisePlan: p_personalExercisePlan},
	  datType: 'json',
	        success: function (res) {
                  console.log(res);
                  if(res[0][0] != "None")	
                  {
					  table = '<table border="1">';
					  for (i = 0; i < res.length; i++)
					  {
						  row = res[i];
						  table += "<tr>";
						  for (j = 0; j < row.length; j++)
						  {
							  table += "<td>" + row[j] + "</td>";
						  }
						  table += "</tr>";
					  }
					  table += "</table>";
					  $("#target").html(table); 
				  } // end if
              }
    });
}

function fetchfitnessplan_bykey() {
  $.ajax({
      url: siteloc + scriptloc + "getfitnessplan_bykey.py",
      data: {gender:$("#gender").val(),
             ageBracket:$("#ageBracket").val(),
             healthStatus:$("#healthStatus").val()},
      dataType: 'json',
		success: function (res) {
                  console.log(res);
                  if(res[0][0] != "None")
                  {
				      table = '<div class="table-responsive">';
					  table += '<table class="table table-condensed">';
					  table += '<thead>' +
					           '<tr>' +
							     '<th>Exercise Plan</th>' +
								 '<th>Diet Plan</th>' +
							   '</tr>' +
					           '</thead>';
					  table += "<tbody>";		   
					  for (i = 0; i < res.length; i++)
					  {
						  row = res[i];
						  table += "<tr>";
						  for (j = 0; j < row.length; j++)
						  {
							  table += "<td>" + row[j] + "</td>";
						  }
						  table += "</tr>";
					  }
					  table += "</tbody>";
					  table += "</table>";
					  table += "</div>";
					  $("#target").html(table); 
				  }
              }
    });
}

function fetchexerciseplan_bykey() {
  $.ajax({
      url: siteloc + scriptloc + "getexerciseplan_bykey.py",
      data: {gender:$("#gender").val(),
             ageBracket:$("#ageBracket").val(),
             healthStatus:$("#healthStatus").val()},
      dataType: 'json',
		success: function (res) {
                  console.log(res);
                  if(res[0][0] != "None")
                  {
				      table = '<div class="table-responsive">';
					  table += '<table class="table table-condensed">';
					  table += '<thead>' +
					           '<tr>' +
							     '<th>Exercise Plan</th>' +
							   '</tr>' +
					           '</thead>';
					  table += "<tbody>";		   
					  for (i = 0; i < res.length; i++)
					  {
						  row = res[i];
						  table += "<tr>";
						  for (j = 0; j < row.length; j++)
						  {
							  table += "<td>" + row[j] + "</td>";
						  }
						  table += "</tr>";
					  }
					  table += "</tbody>";
					  table += "</table>";
					  table += "</div>";
					  $("#target").html(table); 
				  } 
              }
    });
}

function fetchdietplan_bykey() {
  $.ajax({
      url: siteloc + scriptloc + "getdietplan_bykey.py",
      data: {gender:$("#gender").val(),
             ageBracket:$("#ageBracket").val(),
             healthStatus:$("#healthStatus").val()},
      dataType: 'json',
		success: function (res) {
                  console.log(res);
                  if(res[0][0] != "None")
                  {
				      table = '<div class="table-responsive">';
					  table += '<table class="table table-condensed">';
					  table += '<thead>' +
					           '<tr>' +
							     '<th>Exercise Plan</th>' +
							   '</tr>' +
					           '</thead>';
					  table += "<tbody>";		   
					  for (i = 0; i < res.length; i++)
					  {
						  row = res[i];
						  table += "<tr>";
						  for (j = 0; j < row.length; j++)
						  {
							  table += "<td>" + row[j] + "</td>";
						  }
						  table += "</tr>";
					  }
					  table += "</tbody>";
					  table += "</table>";
					  table += "</div>";
					  $("#target").html(table); 
				  } 
              }
    });
}

function setCookie(cname, cvalue) {
    var d = new Date();
    var exdays = 30;
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
}

function generatefitnessplan() {
  $.ajax({
      url: siteloc + scriptloc + "generateplan.py",
      data: {userID:sessionStorage.id},
	  async: true,
      dataType: 'json',
      success: function (res) {
					console.log("Successfully added personal fitness plan.");
              }
    });
  	$('#Plan').collapse('show');
  	$('#generate').prop('disabled',true);
}



function successregister(){
	window.location = "http://localhost/Hygeia/";
}