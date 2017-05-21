auth_user = ''

function register() {

    var email = $('#reg_email').val();
    var password = $('#reg_password').val();

    var data = JSON.stringify({'email': email, 'password': password})

    $.ajax({
        url:'http://127.0.0.1:5000/register',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        success: function(res){
            console.log(res);
            
            if(res.message==='Ok') {
                alert('Registeration successful');
            } 

            else{
                shakeModalReg();
            }
            
        },

        error: function(e){
                alert("Error in database or report to admin charot!: " + e);
        },
        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }

    });
}

function login() {

    var email = $("#email").val();
    var password = $("#password").val();

    var data = JSON.stringify({'email': email, 'password': password});

    $.ajax({
        url: 'http://127.0.0.1:5000/login',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        success: function(res) {
            console.log(res);
            $("#name").html("");
            $("#categories").html("");
            $("#brands").html("");
            $("#user").html("");
            if(res.status==='Login successful' && res.userinfo[0].is_admin===true && res.userinfo[0].is_customer===false) {
                alert('Login Successful:');
                document.location.href="../../partials/admin/dashboard.html";
            } 

            else if(res.status==='Login successful' && res.userinfo[0].is_admin===false && res.userinfo[0].is_customer===true) {
                
                alert('Login Successful');

                for (i=0; i<res.countcategories; i++ ) {
                    category_name = res.categories[i].category_name; 
                    $("#categories").append(getcategoryhtml(category_name));
                }

                for(i=0; i<res.countuserinfo; i++){ 
                    email = res.userinfo[i].email;
                    user_id = res.userinfo[i].user_id;
                    first_name = res.userinfo[i].first_name;
                    last_name = res.userinfo[i].last_name;
                    address1 = res.userinfo[i].address1;
                    address2 = res.userinfo[i].address2;
                    mobile_no = res.userinfo[i].mobile_no;
                    $("#user").append(getuserinfohtml(first_name))
                    $("#myaccount").append(myaccounthtml(user_id))
                }


                /////////////////////////
                /////////PAGES//////////
                ///////////////////////
                $("#accountpage").hide();
                $("#homepage").show();
                $("#categories").show();
                $("#allcarsmenuweb").show();
                $("#allcarsmenumobile").show();
                $("#menu1").show();
                $("#ecommercehomepage2").show();
                $("#ecommercehomepage").hide();
                $("#uname").show();
                $("#cartsearchbutton").show();

            } else {
                alert("Invalid Credentials")
            }
        },

        error: function(e){
                alert("Error in database or report to admin charot!: " + e);
        },
        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }

    });
}   

function myaccounthtml(user_id){
    return '<li onclick="getuseraccount('+user_id+');">'+'<a href="#">My Account</a>'+'</li>'
}

function getuserinfohtml(first_name){
    return '<p> Welcome '+first_name+'</p>'
}

function getuseraccount(user_id) {
    $.ajax({
        url: 'http://127.0.0.1:5000/account/'+ user_id,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#useraccountdetails").html("");
            if(res.status=='Ok'){
                for(i=0; i<res.count; i++) {
                    user_id = res.entries[i].user_id;
                    first_name = res.entries[i].first_name;
                    last_name = res.entries[i].last_name;
                    address1 = res.entries[i].address1;
                    address2 = res.entries[i].address2;
                    mobile_no = res.entries[i].mobile_no;
                    email = res.entries[i].email;
                    $("#useraccountdetails").append(getuseraccounthtml(user_id, first_name, last_name, address1, address2, mobile_no, email))
                }

                /////////////
                //Dashboard//
                ////////////
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addownerpage").hide();
                $("#carownerspage").hide();
                $("#carownersdetailspage").hide();
                $("#addcarpage").hide();
                $("#updatecarpage").hide();
                $("#carspage").hide();
                $("#cardetailspage").show();
                $("#accountcustomerspage").hide();
                $("#profilepage").show();

                /////////////
                //Ecommerce//
                ////////////
                $("#shoppage").hide();
                $("#accountpage").hide();
                $("#homepage").hide();
                $("#cardetailsecommercepage").show();
                $("#useraccountdetails").show();
                $("#useraccountdetailsforupdate").hide();


            } else {
                $("#useraccountdetails").html("");
                alert("Error")
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }
    });


}

function getuseraccounthtml(user_id, first_name, last_name, address1, address2, mobile_no, email) {
    return  '<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">'+
                '<aside class="widget widget-categories">'+
                    '<h3 class="sidebar-title">My Account</h3>'+
                    '<ul class="sidebar-menu">'+

                        '<li onclick="getuseraccount('+user_id+');"><a href="#">My Account</a></li>'+
                        '<li><a href="#">Rental and Tracking</a></li>'+
                        
                    '</ul>'+
                '</aside>'+
            '</div>'+

    '<div class="col-md-6 col-sm-12 col-xs-12">'+
        '<div class="contact-info">'+
            '<h3>Profile</h3>'+
            '<ul>'+
                '<li>'+
                    '<i class="fa fa-envelope">'+'</i>'+'<strong>Email </strong>'+
                    email+
                '</li>'+
                '<li>'+
                    '<i class="fa fa-map-marker">'+'</i>'+'<strong>First Name </strong>'+
                    first_name+
                '</li>'+
                '<li>'+
                    '<i class="fa fa-map-marker">'+'</i>'+'<strong>Last Name </strong>'+
                    last_name+
                '</li>'+
                '<li>'+
                    '<i class="fa fa-map-marker">'+'</i>'+'<strong>Address 1 </strong>'+
                    address1+
                '</li>'+
                '<li>'+
                    '<i class="fa fa-map-marker">'+'</i>'+'<strong>Address 2 </strong>'+
                    address2+
                '</li>'+
                '<li>'+
                '   <i class="fa fa-mobile">'+'</i>'+'<strong>Mobile Number </strong>'+
                    mobile_no+
                '</li>'+
            '</ul>'+
        '</div>'+
        '<div class="col-md-6 col-sm-12 col-xs-12">'+
        '<div class="col-md-6 col-sm-12 col-xs-12">'+
        '<div class="contact-form">'+
            '<input type="button" value="Update" onclick="getuseraccountforupdate('+user_id+')"/>'+
        '</div>'+
        '</div>'+
        '</div>'+

            
    '</div>'
}

function getuseraccountforupdate(user_id){
    $.ajax({
        url: 'http://127.0.0.1:5000/account/'+ user_id,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#useraccountdetailsforupdate").html("");
            if(res.status=='Ok'){
                for(i=0; i<res.count; i++) {
                    user_id = res.entries[i].user_id;
                    email = res.entries[i].email;
                    first_name = res.entries[i].first_name;
                    last_name = res.entries[i].last_name;
                    address1 = res.entries[i].address1;
                    address2 = res.entries[i].address2;
                    mobile_no = res.entries[i].mobile_no;
                    $("#useraccountdetailsforupdate").append(getuseraccountforupdatehtml(user_id))
                }

                document.getElementById('update_user_id').value = user_id;
                document.getElementById('update_email').value = email;
                document.getElementById('update_firstname').value = first_name;
                document.getElementById('update_lastname').value = last_name;
                document.getElementById('update_address1').value = address1;
                document.getElementById('update_address2').value = address2;
                document.getElementById('update_mobile_no').value = mobile_no;

                /////////////
                //Dashboard//
                ////////////
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addownerpage").hide();
                $("#carownerspage").hide();
                $("#carownersdetailspage").hide();
                $("#addcarpage").hide();
                $("#updatecarpage").hide();
                $("#carspage").hide();
                $("#cardetailspage").show();
                $("#accountcustomerspage").hide();
                $("#profilepage").show();

                /////////////
                //Ecommerce//
                ////////////
                $("#shoppage").hide();
                $("#accountpage").hide();
                $("#homepage").hide();
                $("#cardetailsecommercepage").show();
                $("#useraccountdetails").hide();
                $("#useraccountdetailsforupdate").show();

            } else {
                $("#useraccountdetailsforupdate").html("");
                alert("Error")
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }
    });

}

function getuseraccountforupdatehtml(user_id) {
    return  '<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">'+
                '<aside class="widget widget-categories">'+
                    '<h3 class="sidebar-title">My Account</h3>'+
                    '<ul class="sidebar-menu">'+

                        '<li onclick="getuseraccount('+user_id+');"><a href="#">My Account</a></li>'+
                        '<li><a href="#">Rental and Tracking</a></li>'+
                        
                    '</ul>'+
                '</aside>'+
            '</div>'+

    '<div class="col-md-6 col-sm-12 col-xs-12">'+
        '<div class="contact-form">'+
            '<h2>Update Account</h2>'+
            '<div class="row">'+
                    '<form>'+
                        '<div class="col-md-6 col-sm-12 col-xs-12">'+
                            '<input name="update_user_id" id="update_user_id" type="text" disabled/>'+
                        '</div>'+
                        '<div class="col-md-12 col-sm-12 col-xs-12">'+
                            '<input id="update_email" type="text"/>'+
                        '</div>'+
                        '<div class="col-md-6 col-sm-6 col-xs-12">'+
                            '<input name="update_firstname" id="update_firstname" type="text" />'+
                        '</div>'+
                        '<div class="col-md-6 col-sm-6 col-xs-12">'+
                            '<input id="update_lastname" type="text" />'+
                        '</div>'+
                        '<div class="col-md-12 col-sm-12 col-xs-12">'+
                            '<input id="update_address1" type="text" />'+
                        '</div>'+
                        '<div class="col-md-12 col-sm-12 col-xs-12">'+
                            '<input id="update_address2" type="text" />'+
                        '</div>'+
                        '<div class="col-md-12 col-sm-12 col-xs-12">'+
                            '<input id="update_mobile_no" type="text/>'+
                        '</div>'+
                        '<div class="col-md-12 col-sm-12 col-xs-12">'+
                            '<input type="button" value="Update" onclick="updateuseraccount('+user_id+')"/>'+
                        '</div>'+
                    '</form>'+
            '</div>'+
        '</div>'+
    '</div>'
}

function updateuseraccount(uid) {

    var user_id = $("#update_user_id").val();
    var first_name = $("#update_firstname").val();
    var last_name = $("#update_lastname").val();
    var address1 = $("#update_address1").val();
    var address2 = $("#update_address2").val();
    var mobile_no = $("#update_mobile_no").val();
    var email = $("#update_email").val();

    var data = JSON.stringify({'user_id': uid, 'first_name': first_name, 'last_name': last_name,
                'address1': address1, 'address2': address2, 'mobile_no': mobile_no,
                'email': email})

    $.ajax({
        url: 'http://127.0.0.1:5000/account/update/'+uid,
        type: 'PUT',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        success: function(res){
            console.log(res);
            if(res.status==='Ok') {
                alert("Updated!" + data)

                /////////////
                //Dashboard//
                ////////////
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addownerpage").hide();
                $("#carownerspage").hide();
                $("#carownersdetailspage").hide();
                $("#addcarpage").hide();
                $("#updatecarpage").hide();
                $("#carspage").hide();
                $("#cardetailspage").hide();
                $("#updateownerpage").show();
                $("#accountcustomerspage").hide();

            } else {
                alert("Error")
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },

        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }

    });
}

function getcategoryhtml(category_name) {
    return '<div class="col-lg-4 col-md-4" >'+ 
                '<div class="single-product">'+
                    '<div class="product-img">'+
                        '<a href="#" onclick="getcarbycategory(\''+category_name+'\');">'+
                            '<img class="primary-image" src="../../shoptemplate/img/product/1.jpg" alt="" />'+
                            // '<img class="secondary-image" src="img/product/2.jpg" alt="" />'+
                        '</a>'+                        
                    '</div>'+
                '</div>'+
                '<div class="product-content">'+
                    '<h2 class="product-name" style="text-align:center" onclick="getcarbycategory(\''+category_name+'\')"><a href="#">'+category_name+'</a></h2>'+
                '</div>'+
            '</div>'
            
}

function shakeModalLogin(){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
             $('input[type="password"]').val('');
             setTimeout( function(){ 
                $('#loginModal .modal-dialog').removeClass('shake'); 
    }, 1000 ); 
}

function shakeModalReg(){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html("Please fill all fields correctly");
             $('input[type="password"]').val('');
             setTimeout( function(){ 
                $('#loginModal .modal-dialog').removeClass('shake'); 
    }, 1000 ); 
}

function logout() {
    $.ajax({
        url: 'http://127.0.0.1:5000/logout',
        type: 'POST',
        success: function(res){
            console.log(res);
            alert(res.message);
            document.location.href="../../partials/customer/ecommerce.html";
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        beforeSend: function (xhrObj){

            xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        }

    });
}