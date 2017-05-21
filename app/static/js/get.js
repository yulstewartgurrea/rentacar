auth_user=''

function getcars() {
    $.ajax({
        url: 'http://127.0.0.1:5000/cars',
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
                    $("#cars").append(getcarshtml(car_owner_id, car_category_name, car_plate_number, car_brandname, car_model, car_color, car_rental_rate, car_image));
                    $("#carsecommerce").append(getcarsecommercehtml(car_owner_id, car_category_name, car_plate_number, car_brandname, car_model, car_color, car_rental_rate, car_image));

                }

                for(i=0; i<res.countcategories; i++ ) {
                    category_name = res.categories[i].category_name; 
                    $("#categories2").append(getecommercecategoryhtml(category_name));
                }

                for(i=0; i<res.recsusercount; i++) {
                    email = res.recsuser[i].email;
                    user_id = res.recsuser[i].user_id;

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

function getecommercecategoryhtml(category_name) {
    return '<li onclick="getcarbycategory(\''+category_name+'\');">'+'<a href="#">' +category_name+ '</a>'+'</li>'
}

function getecommercebrandhtml(brandname, category_name) {
    // return '<li onclick="getcarbybrand(\''+brandname+'\');">'+'<a href="#">'+brandname+'</a>'+'</li>'
    // return '<li onclick="getcarbycategorybrandname(\''+category_name+'\''+','+'\''+brandname+'\');">'+'<a href="#">'+category_name+','+brandname+'</a>'+'</li>'
    return '<li onclick="getcarbycategorybrandname(\''+category_name+'\',\''+brandname+'\');">'+'<a href="#">'+brandname+'</a>'+'</li>'
    // return '<li onclick="getcarbycategorybrandname(\''+brandname+'\');">'+'<a href="#">'+brandname+'</a>'+'</li>'

}

function getcarshtml(car_owner_id, car_category_name, car_plate_number, car_brandname, car_model, car_color, car_rental_rate, car_image) {
    return '<tr> ' +
            '<td>' + car_owner_id + '</td>' +
            '<td>' + car_category_name + '</td>' +
            '<td>'+ '<a href="#" onclick="getcarbyplatenumber(\''+car_plate_number+'\');">' + car_plate_number + '</a>'+'</td>' +
            '<td>' + car_brandname + '</td>' +
            '<td>' + car_model + '</td>' +
            '<td>' + car_color + '</td>' +
            '<td>' + car_rental_rate + '</td>' +
            '<td>' + car_image + '</td>' +
            '<td>' + '<a href="#" onclick="getcarbyplatenumberforupdate(\''+car_plate_number+'\')">'+ '<div class="ti-pencil-alt"> update' +'</div>'+'</a>'+'</td>' + 
            '<td>' + '<a href="#">'+'<div class="ti-trash"> delete' + '</div>'+'</a>'+'</td>' +                     
            '</tr>'
}

function getcarsecommercehtml(car_owner_id, car_category_name, car_plate_number, car_brandname, car_model, car_color, car_rental_rate, car_image) {
    return '<div class="col-lg-4 col-md-4 col-sm-4">'+
                '<div class="single-product">'+
                    '<div class="product-img">'+
                        '<a href="#" onclick="getcarbyplatenumber(\''+car_plate_number+'\');">'+
                            '<img class="primary-image" src="../../shoptemplate/img/product/women/8.jpg" alt="" />'+
                            '<img class="secondary-image" src="../../shoptemplate/img/product/women/3.jpg" alt="" />'+
                        '</a>'+
                        '<h5 class="product_title">'+'<a href="#" style="text-transform: uppercase" onclick="getcarbyplatenumber(\''+car_plate_number+'\');">'+car_model+'</a>'+'</h5>'+                          
                    '</div>'+
                '</div>'+
            '</div>'
}

function getcarbyplatenumber(car_plate_number){
    $.ajax({
        url: 'http://127.0.0.1:5000/car/platenumber/'+car_plate_number,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#cardetails").html("");
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
                    $("#cardetails").append(getcarbyplatenumberhtml(car_owner_id, car_category_name, car_brandname, car_model, car_color, car_rental_rate, car_image))
                    $("#cardetailsecommerce").append(getcardetailshtmlecommerce(car_owner_id, car_category_name, car_brandname, car_model, car_color, car_rental_rate, car_image))
                }

                for(i=0; i<res.recsusercount; i++){
                    user_id = res.recsuser[i].user_id;
                    first_name = res.recsuser[i].first_name;
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

                /////////////
                //Ecommerce//
                ////////////
                $("#shoppage").hide();
                $("#accountpage").hide();
                $("#homepage").hide();
                $("#cardetailsecommercepage").show();
                $("#profilepage").hide();

            } else {
                $("#cardetails").html("");
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

function getcarbyplatenumberhtml(car_owner_id, car_category_name, car_brandname, car_model, car_color, car_rental_rate, car_image) {
    return '<tr> ' +
            '<td>' + car_owner_id + '</td>' +
            '<td>' + car_category_name + '</td>' +
            '<td>' + car_brandname + '</td>' +
            '<td>' + car_model + '</td>' +
            '<td>' + car_color + '</td>' +
            '<td>' + car_rental_rate + '</td>' +
            '<td>' + car_image + '</td>' +
            '</tr>'
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
                                '<input type="number" value="1" />'+
                                '<button>Add to cart</button>'+
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

function getcarbyplatenumberforupdate(car_plate_number){

    $.ajax({
        url: 'http://127.0.0.1:5000/car/platenumber/'+car_plate_number,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#cardetailsforupdate").html("");
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
                    // $("#cardetails").append(getcarbyplatenumberhtml(car_owner_id, car_category_name, car_brandname, car_model, car_color, car_rental_rate, car_image))
                    // $("#cardetailsecommerce").append(getcardetailshtmlecommerce(car_owner_id, car_category_name, car_brandname, car_model, car_color, car_rental_rate, car_image))
                    $("#cardetailsforupdate").append(carbyplatenumberhtmlforupdate(car_plate_number));
                    // $("#cardetailsforupdate").append(carbyplatenumberhtmlforupdate(car_rental_rate, car_owner_id, car_category_name, car_brandname, car_model, car_color,
                    //                                                                 car_plate_number, car_image, car_plate_number));
                }

                document.getElementById('update_car_owner_id').value = car_owner_id;
                document.getElementById('update_car_category_name').value = car_category_name;
                document.getElementById('update_car_brandname').value = car_brandname;
                document.getElementById('update_car_model').value = car_model;
                document.getElementById('update_car_color').value = car_color;
                document.getElementById('update_car_rental_rate').value = car_rental_rate;
                document.getElementById('update_car_image').value = car_image;
                document.getElementById('update_car_plate_number').value = car_plate_number;

                /////////////
                //Dashboard//
                ////////////
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addownerpage").hide();
                $("#carownerspage").hide();
                $("#carownersdetailspage").hide();
                $("#addcarpage").hide();
                $("#updatecarpage").show();
                $("#carspage").hide();
                $("#cardetailspage").hide();
                $("#accountcustomerspage").hide();

            } else {
                $("#cardetailsforupdate").html("");
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

function carbyplatenumberhtmlforupdate(car_plate_number) {
    return '<div class="row">'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Plate Number</label>'+
                '<input type="text" class="form-control border-input" id="update_car_plate_number" disabled>'+
            '</div>'+
        '</div>'+
    '</div>'+

    '<div class="row">'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Owner</label>'+
                '<input type="text" class="form-control border-input" id="update_car_owner_id">'+
            '</div>'+
        '</div>'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Vehicle Type</label>'+
                '<input type="text" class="form-control border-input" id="update_car_category_name">'+
            '</div>'+
        '</div>'+
    '</div>'+

    '<div class="row">'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Brand Name</label>'+
                '<input type="text" class="form-control border-input" id="update_car_brandname">'+
            '</div>'+
        '</div>'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Model</label>'+
                '<input type="text" class="form-control border-input" id="update_car_model">'+
            '</div>'+
        '</div>'+
    '</div>'+

    '<div class="row">'+
        '<div class="col-md-4">'+
            '<div class="form-group">'+
                '<label>Color</label>'+
                '<input type="text" class="form-control border-input" id="update_car_color">'+
            '</div>'+
        '</div>'+
        '<div class="col-md-4">'+
            '<div class="form-group">'+
                '<label>Image</label>'+
                '<input type="text" class="form-control border-input" id="update_car_image">'+
            '</div>'+
        '</div>'+
        '<div class="col-md-4">'+
            '<div class="form-group">'+
                '<label>Rental Rate</label>'+
                '<input type="number" class="form-control border-input" id="update_car_rental_rate">'+
            '</div>'+
        '</div>'+
    '</div>'+
                                    
    '<div class="text-center">'+
        '<input type="button" class="btn btn-info btn-fill btn-wd" onclick="updatecardetails(\''+car_plate_number+'\');" value="Update">'+
    '</div>'

}

function getcarbycategory(car_category_name) {
    $.ajax({
        url: 'http://127.0.0.1:5000/car/category/'+car_category_name,
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
                    $("#carbycategoryeccomerce").append(getcarbycategoryhtml(car_category_name, car_owner_id, car_plate_number,
                                    car_brandname, car_model, car_color, car_rental_rate, car_image));
                }

                for (i=0; i<res.countcategories; i++ ) {
                    category_name = res.categories[i].category_name; 
                    $("#categories2").append(getecommercecategoryhtml(category_name));
                }

                category_name = car_category_name;
                for(i=0; i<res.countbrands; i++){
                    brandname = res.brands[i].brandname;
                    $("#brands2").append(getecommercebrandhtml(brandname, category_name));    
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
                            car_brandname, car_model, car_color, car_rental_rate, car_image) {
    return '<div class="col-lg-4 col-md-4 col-sm-4">'+
                '<div class="single-product">'+
                    '<div class="product-img">'+
                        '<a href="#" onclick="getcarbyplatenumber(\''+car_plate_number+'\');">'+
                            '<img class="primary-image" src="../../shoptemplate/img/product/women/8.jpg" alt="" />'+
                            '<img class="secondary-image" src="../../shoptemplate/img/product/women/3.jpg" alt="" />'+
                        '</a>'+
                        '<h5 class="product_title"><a href="#" style="text-transform: uppercase" onclick="getcarbyplatenumber(\''+car_plate_number+'\');">'+car_model+'</a></h5>'+                          
                    '</div>'+
                '</div>'+
            '</div>'

}

function getcarbycategorybrandname(categoryname, brandname) {

    $.ajax({
        url: 'http://127.0.0.1:5000/car/category/'+categoryname+'/brand/'+brandname,
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
                    $("#carbycategorybrandecommerce2").append(getcarbybrandcategoryhtml(car_category_name, car_owner_id,
                        car_plate_number, car_model, car_color, car_rental_rate, car_image));
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
                        '<a href="#" onclick="getcarbyplatenumber(\''+car_plate_number+'\');">'+
                            '<img class="primary-image" src="../../shoptemplate/img/product/women/8.jpg" alt="" />'+
                            '<img class="secondary-image" src="../../shoptemplate/img/product/women/3.jpg" alt="" />'+
                        '</a>'+
                        '<h5 class="product_title"><a href="#" style="text-transform: uppercase" onclick="getcarbyplatenumber(\''+car_plate_number+'\');">'+car_model+'</a></h5>'+                          
                    '</div>'+
                '</div>'+
            '</div>'

}

function updatecardetails(plate_number) {

    var car_owner_id = $("#update_car_owner_id").val();
    var car_category_name = $("#update_car_category_name").val();
    var car_brandname = $("#update_car_brandname").val();
    var car_model = $("#update_car_model").val();
    var car_color = $("#update_car_color").val();
    var car_image = $("#update_car_image").val();
    var car_rental_rate = $("#update_car_rental_rate").val();
    var car_image = $("#update_car_image").val();
    var car_plate_number = $("update_car_plate_number").val();

    var data = JSON.stringify({'car_owner_id': car_owner_id, 'car_category_name': car_category_name, 'car_brandname': car_brandname,
                                'car_model': car_model, 'car_color': car_color, 'car_image': car_image, 'car_rental_rate': car_rental_rate,
                                'car_image': car_image, 'car_plate_number': plate_number})

    $.ajax({
        url: 'http://127.0.0.1:5000/car/update/'+plate_number,
        type: 'PUT',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        success: function(res){
            console.log(res);
            if(res.status==='Ok') {
                alert("Car Updated!" + data)
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


function getcarowners() {
    $.ajax({
        url: 'http://127.0.0.1:5000/owners',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(res){
            console.log(res);
            $("#carowners").html("");
            if(res.status==='Ok') {
                for(i=0; i<res.count; i++){
                    owner_id = res.entries[i].owner_id;
                    owner_firstname = res.entries[i].owner_firstname;
                    owner_lastname = res.entries[i].owner_lastname;
                    owner_address1 = res.entries[i].owner_address1;
                    owner_address2 = res.entries[i].owner_address2;
                    owner_mobile_no = res.entries[i].owner_mobile_no;
                    $("#carowners").append(getcarownershtml(owner_id, owner_firstname, owner_lastname, owner_address1,
                        owner_address2, owner_mobile_no));
                }

                /////////////
                //Dashboard//
                ////////////
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addownerpage").hide();
                $("#carownerspage").show();
                $("#carownersdetailspage").hide();
                $("#addcarpage").hide();
                $("#updatecarpage").hide();
                $("#carspage").hide();
                $("#cardetailspage").hide();
                $("#updateownerpage").hide();
                $("#accountcustomerspage").hide();

            } else {
                $("#carowners").html();
                alert("Error");
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

function getcarownershtml(owner_id, owner_firstname, owner_lastname, owner_address1, owner_address2, owner_mobile_no) {
    return '<tr> ' +
            '<td>' + '<a href="#" onclick="getcarownerbyid('+owner_id+');">'+owner_id +'</a>'+ '</td>' +
            '<td>' + owner_firstname + '</td>' +
            '<td>' + owner_lastname + '</td>' +
            '<td>' + owner_address1 + '</td>' +
            '<td>' + owner_address2 + '</td>' +
            '<td>' + owner_mobile_no + '</td>' +
            '<td>' + '<a href="#" onclick="getcarownerbyidforupdate('+owner_id+')">'+ '<div class="ti-pencil-alt"> update' +'</div>'+'</a>'+'</td>' + 
            '<td>' + '<a href="#">'+'<div class="ti-trash"> delete' + '</div>'+'</a>'+'</td>' +                     
            '</tr>'
}

function getcarownerbyid(car_owner_id) {

    $.ajax({
        url: 'http://127.0.0.1:5000/owner/'+car_owner_id,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#carownerdetails").html("");
            if(res.status==='Ok') {
                for(i=0; i<res.count; i++) {
                    owner_id = res.entries[i].owner_id;
                    owner_firstname = res.entries[i].owner_firstname;
                    owner_lastname = res.entries[i].owner_lastname;
                    owner_address1 = res.entries[i].owner_address1;
                    owner_address2 = res.entries[i].owner_address2;
                    owner_mobile_no = res.entries[i].owner_mobile_no;
                    $("#carownerdetails").append(getcarownerbyidhtml(owner_id, owner_firstname, owner_lastname, owner_address1,
                                owner_address2, owner_mobile_no))

                }

                /////////////
                //Dashboard//
                ////////////
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addownerpage").hide();
                $("#carownerspage").hide();
                $("#carownersdetailspage").show();
                $("#addcarpage").hide();
                $("#updatecarpage").hide();
                $("#carspage").hide();
                $("#cardetailspage").hide();
                $("#accountcustomerspage").hide();

            } else {
                $("#carownerdetails").html("");
                alert("Error!");
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

function getcarownerbyidhtml(owner_id, owner_firstname, owner_lastname, owner_address1, owner_address2, owner_mobile_no) {
    return '<tr> ' +
            '<td>' + owner_id + '</td>' +
            '<td>' + owner_firstname + '</td>' +
            '<td>' + owner_lastname + '</td>' +
            '<td>' + owner_address1 + '</td>' +
            '<td>' + owner_address2 + '</td>' +
            '<td>' + owner_mobile_no + '</td>' +
            '</tr>'
}

function getcarownerbyidforupdate(car_owner_id) {

    $.ajax({
        url: 'http://127.0.0.1:5000/owner/'+car_owner_id,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#carownerdetailsforupdate").html("");
            if(res.status==='Ok') {
                for(i=0; i<res.count; i++) {
                    owner_id = res.entries[i].owner_id;
                    owner_firstname = res.entries[i].owner_firstname;
                    owner_lastname = res.entries[i].owner_lastname;
                    owner_address1 = res.entries[i].owner_address1;
                    owner_address2 = res.entries[i].owner_address2;
                    owner_mobile_no = res.entries[i].owner_mobile_no;
                    $("#carownerdetailsforupdate").append(getcarownerbyidforupdatehtml(owner_id))

                }

                document.getElementById('update_owner_id').value = owner_id;
                document.getElementById('update_owner_firstname').value = owner_firstname;
                document.getElementById('update_owner_lastname').value = owner_lastname;
                document.getElementById('update_owner_address1').value = owner_address1;
                document.getElementById('update_owner_address2').value = owner_address2;
                document.getElementById('update_owner_mobile_no').value = owner_mobile_no;

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
                $("#carownerdetailsforupdate").html("");
                alert("Error!");
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

function getcarownerbyidforupdatehtml(owner_id) {
    return '<div class="row">'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Owner ID</label>'+
                '<input type="text" class="form-control border-input" id="update_owner_id" disabled>'+
            '</div>'+
        '</div>'+
    '</div>'+

    '<div class="row">'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>First Name</label>'+
                '<input type="text" class="form-control border-input" id="update_owner_firstname">'+
            '</div>'+
        '</div>'+
        '<div class="col-md-6">'+
            '<div class="form-group">'+
                '<label>Last Name</label>'+
                '<input type="text" class="form-control border-input" id="update_owner_lastname">'+
            '</div>'+
        '</div>'+
    '</div>'+

    '<div class="row">'+
        '<div class="col-md-12">'+
            '<div class="form-group">'+
                '<label>Address 1</label>'+
                '<input type="text" class="form-control border-input" id="update_owner_address1">'+
            '</div>'+
        '</div>'+
    '</div>'+

    '<div class="row">'+
        '<div class="col-md-12">'+
            '<div class="form-group">'+
                '<label>Address 2</label>'+
                '<input type="text" class="form-control border-input" id="update_owner_address2">'+
            '</div>'+
        '</div>'+
    '</div>'+

    '<div class="row">'+
        '<div class="col-md-5">'+
            '<div class="form-group">'+
                '<label>Mobile No.</label>'+
                '<input type="text" class="form-control border-input" id="update_owner_mobile_no">'+
            '</div>'+
        '</div>'+
    '</div>'+
                                    
    '<div class="text-center">'+
        '<input type="button" class="btn btn-info btn-fill btn-wd" onclick="updatecarowner('+owner_id+');" value="Save">'+
    '</div>'
}

function updatecarowner(oid) {

    var owner_id = $("#update_owner_id").val();
    var owner_first_name = $("#update_owner_firstname").val();
    var owner_last_name = $("#update_owner_lastname").val();
    var owner_address1 = $("#update_owner_address1").val();
    var owner_address2 = $("#update_owner_address2").val();
    var owner_mobile_no = $("#update_owner_mobile_no").val();

    var data = JSON.stringify({'owner_id': oid, 'owner_first_name': owner_first_name, 'owner_last_name': owner_last_name,
                'owner_address1': owner_address1, 'owner_address2': owner_address2, 
                'owner_mobile_no': owner_mobile_no})

    $.ajax({
        url: 'http://127.0.0.1:5000/owner/update/'+oid,
        type: 'PUT',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        success: function(res){
            console.log(res);
            if(res.status==='Ok') {
                alert("Car Updated!" + data)

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

function getcustomers() {
    
    $.ajax({
        url: 'http://127.0.0.1:5000/customers',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(res) {
            console.log(res);
            $("#accountcustomers").html("");
            if(res.status=='Ok'){
                for (i=0; i<res.count; i++ ) {
                    customer_user_id = res.entries[i].user_id; 
                    customer_firstname = res.entries[i].first_name;
                    customer_lastname = res.entries[i].last_name;
                    customer_address1 = res.entries[i].address1;
                    customer_address2 = res.entries[i].address2;
                    customer_mobile_no = res.entries[i].mobile_no;
                    customer_email = res.entries[i].email;
                    $("#accountcustomers").append(getcustomershtml(customer_user_id, customer_firstname, customer_lastname, customer_address1,
                                            customer_address2, customer_mobile_no, customer_email));
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
                $("#accountcustomerspage").show();

            } else if(res.status==='Error') {
                $("#accountcustomers").html("");
                alert('Error');
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

function getcustomershtml(customer_user_id, customer_firstname, customer_lastname, customer_address1,
                        customer_address2, customer_mobile_no, customer_email) {
    return '<tr> ' +
            '<td>' + customer_user_id + '</td>' +
            '<td>' + customer_email + '</td>' +
            '<td>' + customer_firstname + '</td>' +
            '<td>' + customer_lastname + '</td>' +
            '<td>' + customer_address1 + '</td>' +
            '<td>' + customer_address2 + '</td>' +
            '<td>' + customer_mobile_no + '</td>' +
            '</tr>'
}

function addtocart() {
    
    $.ajax({
        url: 'http://127.0.0.1:5000/car/'+car_plate_number+'/'+car_brand_name+'/'+car_model+'/'+car_color,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        success: function(res){
            console.log(res);
            if(res.message==='Ok') {
                alert("Vehicle Added!")
            } else {
                alert(res.message)
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