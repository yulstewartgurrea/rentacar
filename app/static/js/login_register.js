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
            } else{
                shakeModalReg();
            }
            
        }

    });
}

function login() {

    var email = $("#email").val();
    var password = $("#password").val();

    var data = JSON.stringify({'email': email, 'password': password});

    $.ajax({
        url: 'http://127.0.0.1:5000/login',
        // url: 'http://localhost:5000/login',
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
            if(res.status==='Login successful' && res.is_admin===true && res.is_customer===false) {
                alert('Login Successful:');
                document.location.href="../../partials/admin/dashboard.html";
            } else if(res.status==='Login successful' && res.is_admin===false && res.is_customer===true) {
                alert('Login Successful');
                $("#name").append(getnamehtml(res.first_name));
                for (i=0; i<res.countcategories; i++ ) {
                    category_name = res.categories[i].category_name; 
                    $("#categories").append(getcategoryhtml(category_name));
                }
                for(i=0; i<res.countbrands; i++){
                    brandname = res.brands[i].brandname;
                    $("#brands").append(getbrandhtml(brandname))                   
                }

                for(i=0; i<res.countuserinfo; i++){ 
                    user_id = res.userinfo[i].first_name;
                    $("#user").append(getuserinfohtml(user_id))
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
        }
    });
}

function getnamehtml(first_name) {
    return first_name
}

function getuserinfohtml(user_id){
    return '<p> Welcome '+user_id+'</p>'
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

function getbrandhtml(brandname){
    return '<div class="col-md-2">'+
                '<div class="single-brand">'+
                    '<a href="#"><img src="../../shoptemplate/img/brand/1.png" alt="" />'+'</a>'+
                '</div>'+
                '<h2 class="product-name" style="text-align:center">'+'<a href="#">'+brandname+'</a>'+'</h2>'+
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
        }

    });
}