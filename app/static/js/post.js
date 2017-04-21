function login() {

    var email = $("#email").val();
    var password = $("#password").val();

    var data = JSON.stringify({"email": email, "password": password});

    $.ajax({
        url: 'http://127.0.0.1:5000/login',
        // url: 'http://localhost:5000/login',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType: 'json',
        success: function(res) {
            if(res.status === 'Login successful' && res.admin===true && res.active===true) {
                alert('Login Successful');
                window.location.href="../partials/admin/dashboard.html";
            } else if(res.status === 'Login successful' && res.establishment===true && res.active===true) {
                alert('Login Successful');
                window.location.href="../partials/establishment/e_dashboard.html";
            } else if(res.status === 'Login successful' && res.customer===true && res.active===true) {
                alert('Login Successful');
                window.location.href="../partials/customer/shop.html";
            } else {
                   alert('Invalid email or password');
            }
        }

    });
}