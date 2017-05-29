auth_user = ''

function register() {

    var email = $('#reg_email').val();
    var password = $('#reg_password').val();
    var password2 = $("#reg_password2").val();

    var data = JSON.stringify({'email': email, 'password': password})

    $.ajax({
        url:'http://127.0.0.1:5000/register',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        success: function(res){
            console.log(res);

            if(res.message==='Email already exists') {
                alert('Email already exists');
            }

            else if(password == '' || password2 == '' ){
                alert("Password mismatch");
            } 

            else if(password != password2){
                alert("Password mismatch")
                error: register(res)
            }

            else if(email == '')
                alert("Invalid Email Address");

            else if(password == ''){
                alert('Password mismatch')
            }

            else if(res.message=='Ok') {
                alert('Successfully Registered!')
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

                for(i=0; i<res.countuserinfo; i++){ 
                    email = res.userinfo[i].email;
                    user_id = res.userinfo[i].user_id;
                    first_name = res.userinfo[i].first_name;
                    last_name = res.userinfo[i].last_name;
                    address1 = res.userinfo[i].address1;
                    address2 = res.userinfo[i].address2;
                    mobile_no = res.userinfo[i].mobile_no;
                    // $("#user").append(getuserinfohtml(first_name))
                    $("#myaccount").append(myaccounthtml(user_id))
                }

                var user_id = user_id;
                for(i=0; i<res.countcategories; i++ ) {
                    category_name = res.categories[i].category_name; 
                    categry_user_id = res.categories[i].user_id;
                    $("#categories").append(getcategoryhtml(category_name, user_id));

                }

                var category_name = category_name;

                $("#user").append(getuserinfohtml(first_name))
                $("#allcarsecommerce").append(getallcarsecommercehtml(user_id));
                // $("#categories").append(getcategoryhtml(category_name));


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

function getallcarsecommercehtml(user_id) {
    return '<li onclick="getcars('+user_id+');">'+'<a href="#">Vehicles</a>'+'</li>'
}

function getcategoryhtml(category_name,user_id) {
    return '<div class="col-lg-4 col-md-4" >'+ 
                '<div class="single-product">'+
                    '<div class="product-img">'+
                        '<a href="#" onclick="getcarbycategory(\''+category_name+'\', '+user_id+');">'+
                            '<img class="primary-image" src="../../shoptemplate/img/product/1.jpg" alt="" />'+
                            // '<img class="secondary-image" src="img/product/2.jpg" alt="" />'+
                        '</a>'+                        
                    '</div>'+
                '</div>'+
                '<div class="product-content">'+
                    '<h2 class="product-name" style="text-align:center" onclick="getcarbycategory(\''+category_name+'\', '+user_id+')"><a href="#">'+category_name+'</a></h2>'+
                '</div>'+
            '</div>'
            
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
                $("#cardetailspage").hide();
                $("#accountcustomerspage").hide();

                /////////////
                //Ecommerce//
                ////////////
                $("#shoppage").hide();
                $("#accountpage").hide();
                $("#homepage").hide();
                $("#cardetailsecommercepage").hide();
                $("#useraccountdetails").show();
                $("#useraccountdetailsforupdate").hide();
                $("#profilepage").show();
                $("#renstbyuseridecommerce").hide();




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
                        '<li onclick="getrentsbyuserid('+user_id+');"><a href="#">Rental and Tracking</a></li>'+
                        
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
                        '<li onclick="getrentsbyuserid('+user_id+');"><a href="#">Rental and Tracking</a></li>'+
                        
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

function getcars(user_id) {
    $.ajax({
        url: 'http://127.0.0.1:5000/cars/'+user_id,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(res) {
            console.log(res);
            $("#cars").html("");
            $("#carsecommerce").html("");
            $("#categories2").html("");
            $("#brands2").html("");
            if(res.status=='Ok'){
                for (i=0; i<res.count; i++ ) {
                    car_plate_number = res.entries[i].car_plate_number; 
                    car_brandname = res.entries[i].car_brandname;
                    car_model = res.entries[i].car_model;
                    car_color = res.entries[i].car_color;
                    car_rental_rate = res.entries[i].car_rental_rate;
                    car_image = res.entries[i].car_image;
                    car_owner_id = res.entries[i].car_owner_id;
                    car_category_name = res.entries[i].car_category_name;
                    user_id = res.entries[i].user_id;
                    $("#cars").append(getcarshtml(car_owner_id, car_category_name, car_plate_number, car_brandname, car_model, car_color, car_rental_rate, car_image));
                    $("#carsecommerce").append(getcarsecommercehtml(car_owner_id, car_category_name,
                            car_plate_number, car_brandname, car_model, car_color, car_rental_rate, car_image, user_id));

                }

                var user_id = user_id;

                for(i=0; i<res.countcategories; i++ ) {
                    category_name = res.categories[i].category_name; 
                    category_user_id = res.categories[i].user_id;
                    $("#categories2").append(getecommercecategoryhtml(category_name, user_id));
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
                $("#carspage").show();
                $("#cardetailspage").hide();
                $("#updateownerpage").hide();
                $("#accountcustomerspage").hide();
                

                /////////////
                //Ecommerce//
                ////////////
                $("#shoppage").show();
                $("#accountpage").hide();
                $("#homepage").hide();
                $("#cardetailsecommercepage").hide();
                $("#carsecommerce").show();
                $("#carbycategorybrandecommerce2").hide();
                $("#carbycategoryeccomerce").hide();
                $("#profilepage").hide();

            } else {
                $("#cars").html("");
                alert('Error')
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

function getcarsecommercehtml(car_owner_id, car_category_name, car_plate_number, car_brandname, car_model, car_color, car_rental_rate, car_image, user_id) {
    return '<div class="col-lg-4 col-md-4 col-sm-4">'+
                '<div class="single-product">'+
                    '<div class="product-img">'+
                        '<a href="#" onclick="getcarbyplatenumbereccomerce(\''+car_plate_number+'\', '+user_id+');">'+
                            '<img class="primary-image" src="../../shoptemplate/img/product/women/8.jpg" alt="" />'+
                            '<img class="secondary-image" src="../../shoptemplate/img/product/women/3.jpg" alt="" />'+
                        '</a>'+
                        '<h5 class="product_title">'+'<a href="#" style="text-transform: uppercase" onclick="getcarbyplatenumbereccomerce(\''+car_plate_number+'\', '+user_id+');">'+car_model+'</a>'+'</h5>'+                          
                    '</div>'+
                '</div>'+
            '</div>'
}

function getecommercecategoryhtml(category_name, user_id) {
    return '<li onclick="getcarbycategory(\''+category_name+'\', '+user_id+');">'+'<a href="#">' +category_name+ '</a>'+'</li>'
}

function getecommercebrandhtml(brandname, category_name, user_id) {
    // return '<li onclick="getcarbybrand(\''+brandname+'\');">'+'<a href="#">'+brandname+'</a>'+'</li>'
    // return '<li onclick="getcarbycategorybrandname(\''+category_name+'\''+','+'\''+brandname+'\');">'+'<a href="#">'+category_name+','+brandname+'</a>'+'</li>'
    return '<li onclick="getcarbycategorybrandname(\''+category_name+'\',\''+brandname+'\', '+user_id+');">'+'<a href="#">'+brandname+'</a>'+'</li>'
    // return '<li onclick="getcarbycategorybrandname(\''+brandname+'\');">'+'<a href="#">'+brandname+'</a>'+'</li>'

}

function getcarbyplatenumbereccomerce(car_plate_number, user_id){
    $.ajax({
        url: 'http://127.0.0.1:5000/car/platenumber/'+car_plate_number+'/'+user_id,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#cardetailsecommerce").html("");
            if(res.status=='Ok'){
                for(i=0; i<res.count; i++) {
                    car_plate_number = res.entries[i].car_plate_number;
                    car_color = res.entries[i].car_color;
                    car_brandname = res.entries[i].car_brandname;
                    car_model = res.entries[i].car_model;
                    car_rental_rate = res.entries[i].car_rental_rate;
                    car_image = res.entries[i].car_image;
                    car_owner_id = res.entries[i].car_owner_id;
                    car_category_name = res.entries[i].car_category_name;
                    user_id = res.entries[i].user_id;
                    // $("#cardetails").append(getcarbyplatenumberhtml(car_owner_id, car_category_name, car_brandname, car_model, car_color, car_rental_rate, car_image))
                    $("#cardetailsecommerce").append(getcardetailshtmlecommerce(car_owner_id, car_category_name, car_brandname, car_model, car_color, car_rental_rate, car_image))
                }

                document.getElementById('rent_plate_number').value = car_plate_number;
                document.getElementById('rent_user_id').value = user_id;

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

                /////////////
                //Ecommerce//
                ////////////
                $("#shoppage").hide();
                $("#accountpage").hide();
                $("#homepage").hide();
                $("#cardetailsecommercepage").show();
                $("#profilepage").hide();

            } else {
                $("#cardetailsecommerce").html("");
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

function getcardetailshtmlecommerce(car_owner_id, car_category_name, car_brandname, car_model, car_color, car_rental_rate, car_image) {
    return '<div class="product-simple-area">'+
        '<div class="container">'+
            '<div class="row">'+
                '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">'+
                    '<div class="single-product-image">'+
                        '<div class="single-product-tab">'+
                          // <!-- Nav tabs -->
                          '<ul class="nav nav-tabs" role="tablist">'+
                            '<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab"><img alt="" src="../../shoptemplate/img/product/tab/s1.jpg"></a></li>'+
                            '<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab"><img alt="" src="../../shoptemplate/img/product/tab/s2.jpg"></a></li>'+
                            '<li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab"><img alt="" src="../../shoptemplate/img/product/tab/s3.jpg"></a></li>'+
                            '<li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab"><img alt="" src="../../shoptemplate/img/product/tab/s4.jpg"></a></li>'+
                          '</ul>'+

                          // <!-- Tab panes -->
                          '<div class="tab-content">'+
                            '<div role="tabpanel" class="tab-pane active" id="home"><img alt="" src="../../shoptemplate/img/product/tab/1.jpg"></div>'+
                            '<div role="tabpanel" class="tab-pane" id="profile"><img alt="" src="../../shoptemplate/img/product/tab/2.jpg"></div>'+
                            '<div role="tabpanel" class="tab-pane" id="messages"><img alt="" src="../../shoptemplate/img/product/tab/3.jpg"></div>'+
                            '<div role="tabpanel" class="tab-pane" id="settings"><img alt="" src="../../shoptemplate/img/product/tab/4.jpg"></div>'+
                          '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">'+
                    '<div class="single-product-info">'+
                        '<div class="product-nav">'+
                            '<a href="#"><i class="fa fa-angle-right"></i></a>'+
                        '</div>'+
                        '<h1 class="product_title">'+car_model+'</h1>'+
                        '<div class="price-box">'+
                            '<span class="new-price">'+car_rental_rate+'</span>'+
                            '<span class="old-price">£190.00</span>'+
                        '</div>'+
                        '<div class="pro-rating">'+
                            // <a href="#"><i class="fa fa-star"></i></a>
                            // <a href="#"><i class="fa fa-star"></i></a>
                            // <a href="#"><i class="fa fa-star"></i></a>
                            // <a href="#"><i class="fa fa-star"></i></a>
                            '<a href="#"><i class="fa fa-star"></i></a>'+
                        '</div>'+
                        '<div class="short-description">'+
                            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.</p>'+                      
                        '</div>'+
                        '<div class="stock-status">'+
                            '<label>Availability</label>: <strong>In stock</strong>'+
                        '</div>'+
                        '<form action="#">'+
                            '<div class="quantity">'+
                                '<input type="hidden" id="rent_plate_number" />'+
                                '<input type="hidden" id="rent_user_id" />'+
                                '<button onclick="myFunction();">Rent Car</button>'+
                            '</div>'+
                        '</form>'+
                        '<div class="add-to-wishlist">'+
                            '<a href="#" data-toggle="tooltip" title="Add to Wishlist"><i class="fa fa-star"></i></a>'+
                            '<a href="#" data-toggle="tooltip" title="Compare"><i class="fa fa-exchange"></i></a>'+
                        '</div>'+
                        '<div class="share_buttons">'+
                            '<a href="#"><img src="../../shoptemplate/img/share-img.png" alt="" /></a>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
    // <!-- product-simple-area end -->

    '<div class="product-tab-area">'+
        '<div class="container">'+
            '<div class="row">'+
                '<div class="col-lg-12 col-md-12">'+
                    '<div class="product-tabs">'+
                        '<div>'+
                          // <!-- Nav tabs -->
                          '<ul class="nav nav-tabs" role="tablist">'+
                            '<li role="presentation" class="active"><a href="#tab-desc" aria-controls="tab-desc" role="tab" data-toggle="tab">Description</a></li>'+
                            '<li role="presentation"><a href="#page-comments" aria-controls="page-comments" role="tab" data-toggle="tab">Reviews (1)</a></li>'+
                          '</ul>'+
                          // <!-- Tab panes -->
                          '<div class="tab-content">'+
                            '<div role="tabpanel" class="tab-pane active" id="tab-desc">'+
                                '<div class="product-tab-desc">'+
                                    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.</p>'+
                                    // <p>Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum turpis eros eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in accumsan elit odio quis mi. Cras neque metus, consequat et blandit et, luctus a nunc. Etiam gravida vehicula tellus, in imperdiet ligula euismod eget.</p>
                                '</div>'+
                            '</div>'+
                          '</div>'+
                        '</div>'+                      
                    '</div>'+
                    '<div class="clear"></div>'+
                '</div>'+
                '<div class="col-lg-3 col-md-3">'+         
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'

}

function getcarbycategory(car_category_name, user_id) {
    $.ajax({
        url: 'http://127.0.0.1:5000/car/category/'+user_id+'/'+car_category_name,
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            $("#carbycategoryeccomerce").html("");
            $("#categories2").html("");
            $("#brands2").html("");
            if(res.status=='Ok'){
                for (i=0; i<res.count; i++ ) {
                    car_category_name = res.entries[i].car_category_name;
                    car_plate_number = res.entries[i].car_plate_number; 
                    car_brandname = res.entries[i].car_brandname;
                    car_model = res.entries[i].car_model;
                    car_color = res.entries[i].car_color;
                    car_rental_rate = res.entries[i].car_rental_rate;
                    car_image = res.entries[i].car_image;
                    car_owner_id = res.entries[i].car_owner_id;
                    user_id = res.entries[i].user_id;
                    $("#carbycategoryeccomerce").append(getcarbycategoryhtml(car_category_name, car_owner_id, car_plate_number,
                                    car_brandname, car_model, car_color, car_rental_rate, car_image, user_id));
                }

                var user_id = user_id;

                for (i=0; i<res.countcategories; i++ ) {
                    category_name = res.categories[i].category_name;
                    // user_id = 
                    $("#categories2").append(getecommercecategoryhtml(category_name, user_id));
                }

                var category_name = car_category_name;
                for(i=0; i<res.countbrands; i++){
                    brandname = res.brands[i].brandname;
                    $("#brands2").append(getecommercebrandhtml(brandname, category_name, user_id));    
                }                

                /////////////
                //Ecommerce//
                ////////////
                $("#shoppage").show();
                $("#homepage").hide();
                $("#cardetailsecommercepage").hide();
                $("#carsecommerce").hide();
                $("#carbycategorybrandecommerce2").hide();
                $("#carbycategoryeccomerce").show();
                $("#profilepage").show();

            } else if(res.status==='Error') {
                $("#carbycategoryeccomerce").html("");
                $("#categories2").html("");
                $("#brands2").html("");
                alert('Error')
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

function getcarbycategoryhtml(car_category_name, car_owner_id, car_plate_number,
                            car_brandname, car_model, car_color, car_rental_rate, car_image, user_id) {
    return '<div class="col-lg-4 col-md-4 col-sm-4">'+
                '<div class="single-product">'+
                    '<div class="product-img">'+
                        '<a href="#" onclick="getcarbyplatenumbereccomerce(\''+car_plate_number+'\', '+user_id+');">'+
                            '<img class="primary-image" src="../../shoptemplate/img/product/women/8.jpg" alt="" />'+
                            '<img class="secondary-image" src="../../shoptemplate/img/product/women/3.jpg" alt="" />'+
                        '</a>'+
                        '<h5 class="product_title"><a href="#" style="text-transform: uppercase" onclick="getcarbyplatenumbereccomerce(\''+car_plate_number+'\', '+user_id+');">'+car_model+'</a></h5>'+                          
                    '</div>'+
                '</div>'+
            '</div>'

}

function getcarbycategorybrandname(categoryname, brandname, user_id) {

    $.ajax({
        url: 'http://127.0.0.1:5000/car/category/'+categoryname+'/brand/'+brandname+'/'+user_id,
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            $("#carbycategorybrandecommerce2").html("");
            if(res.status==='Ok'){
                for (i=0; i<res.count; i++ ) {
                    car_category_name = res.entries[i].car_category_name;
                    car_plate_number = res.entries[i].car_plate_number; 
                    car_model = res.entries[i].car_model;
                    car_color = res.entries[i].car_color;
                    car_rental_rate = res.entries[i].car_rental_rate;
                    car_image = res.entries[i].car_image;
                    car_owner_id = res.entries[i].car_owner_id;
                    user_id = res.entries[i].user_id;
                    $("#carbycategorybrandecommerce2").append(getcarbybrandcategoryhtml(car_category_name, car_owner_id,
                        car_plate_number, car_model, car_color, car_rental_rate, car_image, user_id));
                }
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addcarpage").hide();
                $("#carspage").show();
                $("#addownerpage").hide();
                $("#updatecarpage").hide();
                $("#carsecommerce").hide()
                $("#carbycategoryeccomerce").hide();
                $("#carbycategorybrandecommerce2").show();
                $("#profilepage").show();

            } else if(res.status==='Error') {
                $("#carbycategorybrandecommerce2").html("");
                alert('Error')
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

function getcarbybrandcategoryhtml(car_category_name, car_owner_id, car_plate_number,
                            car_model, car_color, car_rental_rate, car_image) {
    return '<div class="col-lg-4 col-md-4 col-sm-4">'+
                '<div class="single-product">'+
                    '<div class="product-img">'+
                        '<a href="#" onclick="getcarbyplatenumbereccomerce(\''+car_plate_number+'\', '+user_id+');">'+
                            '<img class="primary-image" src="../../shoptemplate/img/product/women/8.jpg" alt="" />'+
                            '<img class="secondary-image" src="../../shoptemplate/img/product/women/3.jpg" alt="" />'+
                        '</a>'+
                        '<h5 class="product_title"><a href="#" style="text-transform: uppercase" onclick="getcarbyplatenumbereccomerce(\''+car_plate_number+'\', '+user_id+');">'+car_model+'</a></h5>'+                          
                    '</div>'+
                '</div>'+
            '</div>'

}

function myFunction() {
    var r = confirm("Are you sure you want to rent already?");
    if (r == true) {
        rentcar();
    } else {
        alert('Cancel')    
    }
}

function rentcar() {
    var rent_plate_number = $('#rent_plate_number').val();
    var rent_user_id = $('#rent_user_id').val();

    var data = JSON.stringify({'rent_plate_number': rent_plate_number, 'rent_user_id': rent_user_id }) 


    $.ajax({
        url: 'http://127.0.0.1:5000/rent',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        success: function(res){
            console.log(res);
            if(res.message==='Ok') {
                alert("Car Rented!")
            } else {
                alert(res.message)
            }
        }
    });
}

function getrentsbyuserid(user_id) {

    $.ajax({
        url: 'http://127.0.0.1:5000/rentals/'+user_id,
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            $("#renstbyuseridecommerce").html("");
            if(res.status==='Ok'){
                for (i=0; i<res.count; i++ ) {
                    rental_id = res.entries[i].rental_id;
                    rent_date_rented = res.entries[i].rent_date_rented; 
                    rent_date_due = res.entries[i].rent_date_due;
                    rent_total_bill = res.entries[i].rent_total_bill;
                    rent_overdue_cost = res.entries[i].rent_overdue_cost;
                    rent_plate_number = res.entries[i].rent_plate_number;
                    rent_user_id = res.entries[i].rent_user_id;
                    rent_quantity = res.entries[i].rent_quantity;
                    $("#renstbyuseridecommerce").append(getrentsbyuseridhtml(rental_id, rent_date_rented,
                        rent_date_due, rent_total_bill, rent_overdue_cost, rent_plate_number, rent_user_id, rent_quantity));
                }
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addcarpage").hide();
                $("#carspage").show();
                $("#addownerpage").hide();
                $("#updatecarpage").hide();
                $("#carsecommerce").hide()
                $("#carbycategoryeccomerce").hide();
                $("#carbycategorybrandecommerce2").show();
                $("#profilepage").show();
                $("#useraccountdetails").hide();
                $("#useraccountdetailsforupdate").hide();
                $("#renstbyuseridecommerce").show();

            } else if(res.status==='Error') {
                $("#renstbyuseridecommerce").html("");
                alert('Error')
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

function getrentsbyuseridhtml(rental_id, rent_date_rented,
                        rent_date_due, rent_total_bill, rent_overdue_cost, rent_plate_number, rent_user_id, rent_quantity) {
    return  '<div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">'+
                '<aside class="widget widget-categories">'+
                    '<h3 class="sidebar-title">My Account</h3>'+
                    '<ul class="sidebar-menu">'+

                        '<li onclick="getuseraccount('+rent_user_id+');"><a href="#">My Account</a></li>'+
                        '<li onclick="getrentsbyuserid('+rent_user_id+');"><a href="#">Rental and Tracking</a></li>'+
                        
                    '</ul>'+
                '</aside>'+
            '</div>'+

    '<div class="col-md-6 col-sm-12 col-xs-12">'+
        '<div class="contact-info">'+
            '<h3>Profile</h3>'+
            '<ul>'+
                '<li>'+
                    '<i class="fa fa-envelope">'+'</i>'+'<strong>Rental ID </strong>'+
                    rental_id+
                '</li>'+
                '<li>'+
                    '<i class="fa fa-map-marker">'+'</i>'+'<strong>Date Rented </strong>'+
                    rent_date_rented+
                '</li>'+
                '<li>'+
                    '<i class="fa fa-map-marker">'+'</i>'+'<strong>Date Due </strong>'+
                    rent_date_due+
                '</li>'+
                '<li>'+
                    '<i class="fa fa-map-marker">'+'</i>'+'<strong>Total Bill </strong>'+
                    rent_total_bill+
                '</li>'+
                '<li>'+
                    '<i class="fa fa-map-marker">'+'</i>'+'<strong>Overdue Cost </strong>'+
                    rent_overdue_cost+
                '</li>'+
                '<li>'+
                '   <i class="fa fa-mobile">'+'</i>'+'<strong>Plate Number </strong>'+
                    rent_plate_number+
                '</li>'+
                '<li>'+
                '   <i class="fa fa-mobile">'+'</i>'+'<strong>Quantity </strong>'+
                    rent_quantity+
                '</li>'+
            '</ul>'+
        '</div>'+
        '<div class="col-md-6 col-sm-12 col-xs-12">'+
        '</div>'+
        '</div>'+

            
    '</div>'
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