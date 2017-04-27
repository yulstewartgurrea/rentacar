function login() {

    var email = $("#email").val();
    var password = $("#password").val();

    var data = JSON.stringify({'email': email, 'password': password});

    $.ajax({
        url: 'http://127.0.0.1:5000/login',
        // url: 'http://localhost:5000/login',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType: 'json',
        success: function(res) {
            console.log(res);
            if(res.status==='Login successful' && res.is_admin===true && res.is_customer===false) {
                alert('Login Successful');
                window.location.href="partials/admin/dashboard.html";
            } 
            // else if(res.status === 'Login successful' && res.customer===true && res.active===true) {
                // alert('Login Successful');
                // window.location.href="../partials/customer/shop.html";
            // } 
            else {
                   shakeModal();
            }
        }

    });
}

function register() {

    var reg_email = $('#reg_email').val();
    var reg_password = $('#reg_password').val();

    var date = JSON.stringify({'email': reg_email, 'password': reg_password})

    $.ajax({
        url:
        type:
        contentType:
        data:
        dataType:
        success: function(res){
            
        }

    });
}

function shakeModal(){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
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
            window.location.href="../../login_register_modal.html"
        }

    });
}