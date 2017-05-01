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
            $("#categories").html("");
            if(res.status==='Login successful' && res.is_admin===true && res.is_customer===false) {
                alert('Login Successful:');
                document.location.href="../../partials/admin/dashboard.html";
            } else if(res.status==='Login successful' && res.is_admin===false && res.is_customer===true) {
                alert('Login Successful');
                for (i=0; i<res.count; i++ ) {
                    category_name = res.entries[i].category_name; 
                    $("#categories").append(getcategoryhtml(category_name));
                }
                // window.location.href="partials/customer/ecommerce.html";
                $("#accountpage").hide();
                $("#homepage").show();
                $("#shoppage").hide();
                $("#cardetailspage").hide();
                $("#cartpage").hide();
                $("#checkoutpage").hide();
                $("#brandarea").show();
                $("#categories").show();
            } else {
                shakeModalLogin();
            }
        }
    });
}

function getcategoryhtml(category_name) {
    return '<div class="col-lg-3 col-md-3" >'+ 
                '<div class="product-content">'+
                '<h2 class="product-name"><a href="#">'+category_name+'</a></h2>'+
                '</div>'+
            '</div>'

}

function register() {

    var reg_email = $('#reg_email').val();
    var reg_password = $('#reg_password').val();

    var data = JSON.stringify({'email': reg_email, 'password': reg_password})

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