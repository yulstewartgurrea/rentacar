// function getcategory() {
//     $.ajax({
//         url: 'http://127.0.0.1:5000/category',
//         type: 'GET',
//         dataType: 'json',
//         success: function(res) {
//             console.log(res);
//             $("#categories").html("");
//             if(res.status=='Ok'){
//                 for (i=0; i<res.count; i++ ) {
//                     category_name = res.entries[i].category_name; 
//                     $("#categories").append(getcategoryhtml(category_name));
//                 }
//                 $("#mainpage").hide();
//                 $("#userprofilepage").hide();
//                 $("#addcarpage").hide();
//                 $("#carspage").show();
//                 $("#addownerpage").hide();
//                 $("#updatecarpage").hide();
//             } else {
//                 $("#categories").html("");
//                 alert('Error')
//             }
//         }
//     });

// }


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
            $("#brands2").html();
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

                for (i=0; i<res.countcategories; i++ ) {
                    category_name = res.categories[i].category_name; 
                    $("#categories2").append(getecommercecategoryhtml(category_name));
                }

                // for(i=0; i<res.countbrands; i++){
                //     brandname = res.brands[i].brandname;
                //     $("#brands2").append(getecommercebrandhtml(brandname));    

                // }

                // for(i=0; i<res.countcategoriesbrand; i++){
                //     car_plate_number = res.entries[i].car_plate_number; 
                //     car_model = res.entries[i].car_model;
                //     car_color = res.entries[i].car_color;
                //     car_rental_rate = res.entries[i].car_rental_rate;
                //     car_image = res.entries[i].car_image;
                //     car_owner_id = res.entries[i].car_owner_id;
                //     $("#categoriesbrand").append(getecommercecategoriesbrandhtml(car_owner_id, car_plate_number, car_model, car_color, car_rental_rate, car_image))
                // }

                // for(i=0; i<res.countcategories; i++){
                //     category_name = res.categories[i].category_name; 
                //     for(i=0; i<res.countbrands; i++){
                //         brandname = res.brands[i].brandname;
                //         $("#categoriesbrand").append(getecommercebrandhtml(category_name, brandname))
                //     }
                // }

                for(i=0; i<res.countcategorybrand; i++){
                    category_name = res.categorybrand[i].category_name;
                    brandname = res.categorybrand[i].brandname;
                    $("#categoriesbrand").append(getecommercebrandhtml(category_name, brandname))
                }

                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addcarpage").hide();
                $("#carspage").show();
                $("#addownerpage").hide();
                $("#updatecarpage").hide();
                $("#shoppage").show();
                $("#accountpage").hide();
                $("#homepage").hide();
                $("#cardetailsecommercepage").hide();
                // $("#carbycategoryeccomerce").hide();


            } else {
                $("#cars").html("");
                alert('Error')
            }
        }
    });
}

function getecommercecategoryhtml(category_name) {
    return '<li onclick="getcarbycategory(\''+category_name+'\');">'+'<a href="#">' +category_name+ '</a>'+'</li>'
}

function getecommercebrandhtml(category_name, brandname) {
    // return '<li onclick="getcarbybrand(\''+brandname+'\');">'+'<a href="#">'+brandname+'</a>'+'</li>'
    return '<li onclick="getcarbycategorybrandname(\''+category_name+'\''+','+'\''+brandname+'\');">'+'<a href="#">'+category_name+','+brandname+'</a>'+'</li>'
}

function getcarshtml(car_owner_id, car_category_name, car_plate_numbers, car_brandname, car_model, car_color, car_rental_rate, car_image) {
    return '<tr> ' +
            '<td>' + car_owner_id + '</td>' +
            '<td>' + car_category_name + '</td>' +
            '<td>'+ '<a href="#" onclick="getcarbyplatenumber(\''+car_plate_number+'\');">' + car_plate_number + '</a>'+'</td>' +
            '<td>' + car_brandname + '</td>' +
            '<td>' + car_model + '</td>' +
            '<td>' + car_color + '</td>' +
            '<td>' + car_rental_rate + '</td>' +
            '<td>' + car_image + '</td>' +
            '<td>' + '<div class="ti-pencil-alt"> update' + '</td>' + 
            '<td>' + '<div class="ti-trash"> delete' + '</td>' +                     
            '</tr>'
}

function getcarsecommercehtml(car_owner_id, car_category_name, car_plate_numbers, car_brandname, car_model, car_color, car_rental_rate, car_image) {
    return '<div class="col-lg-4 col-md-4 col-sm-4">'+
                '<div class="single-product">'+
                    '<div class="product-img">'+
                        '<a href="#" onclick="getcarbyplatenumber(\''+car_plate_number+'\');">'+
                            '<img class="primary-image" src="../../shoptemplate/img/product/women/8.jpg" alt="" />'+
                            '<img class="secondary-image" src="../../shoptemplate/img/product/women/3.jpg" alt="" />'+
                        '</a>'+
                        '<h2 class="product_title"><a href="#" onclick="getcarbyplatenumber(\''+car_plate_number+'\');">'+car_model+'</a></h2>'+                          
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
                $("#updatecarpage").show();
                $("#carspage").hide();
                $("#shoppage").hide();
                $("#cardetailsecommercepage").show();
            } else {
                $("#cardetails").html("");
                alert("Error")
            }
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
    // <div class="row">
    //     <div class="col-md-6">
    //         <div class="form-group">
    //             <label>Plate Number</label>
    //             <input type="text" class="form-control border-input" id="car_plate_number">
    //         </div>
    //     </div>
    //     <div class="col-md-6">
    //         <div class="form-group">
    //             <label>Owner</label>
    //             <input type="text" class="form-control border-input" id="car_owner_id">
    //         </div>
    //     </div>
    // </div>

    // <div class="row">
    //     <div class="col-md-6">
    //         <div class="form-group">
    //             <label>Brand Name</label>
    //             <input type="text" class="form-control border-input" id="car_brand_name">
    //         </div>
    //     </div>
    //     <div class="col-md-6">
    //         <div class="form-group">
    //             <label>Model</label>
    //             <input type="text" class="form-control border-input" id="car_model">
    //         </div>
    //     </div>
    // </div>

    // <div class="row">
    //     <div class="col-md-4">
    //         <div class="form-group">
    //             <label>Color</label>
    //             <input type="text" class="form-control border-input" id="car_color">
    //         </div>
    //     </div>
    //     <div class="col-md-4">
    //         <div class="form-group">
    //             <label>Image</label>
    //             <input type="text" class="form-control border-input" id="car_image">
    //         </div>
    //     </div>
    //     <div class="col-md-4">
    //         <div class="form-group">
    //             <label>Rental Rate</label>
    //             <input type="text" class="form-control border-input" id="car_rental_rate">
    //         </div>
    //     </div>
    // </div>
                                    
    // <div class="text-center">
    //     <input type="button" class="btn btn-info btn-fill btn-wd" onclick="addcar();" value="Save">
    // </div>

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
                                '<button type="submit">Add to cart</button>'+
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

function getcarbycategory(car_category_name) {
    $.ajax({
        url: 'http://127.0.0.1:5000/car/category/'+car_category_name,
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            $("#carbycategoryeccomerce").html("");
            if(res.status=='Ok'){
                for (i=0; i<res.count; i++ ) {
                    car_plate_number = res.entries[i].car_plate_number; 
                    car_brandname = res.entries[i].car_brandname;
                    car_model = res.entries[i].car_model;
                    car_color = res.entries[i].car_color;
                    car_rental_rate = res.entries[i].car_rental_rate;
                    car_image = res.entries[i].car_image;
                    car_owner_id = res.entries[i].car_owner_id;
                    $("#carbycategoryeccomerce").append(getcarbycategoryhtml(car_owner_id, car_plate_number, car_brandname, car_model, car_color, car_rental_rate, car_image));
                }
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addcarpage").hide();
                $("#carspage").show();
                $("#addownerpage").hide();
                $("#updatecarpage").hide();
                $("#carsecommerce").hide()

            } else if(res.status==='Error') {
                $("#carbycategoryeccomerce").html("");
                alert('Error')
            }
        }
    });
}

function getcarbycategoryhtml(car_owner_id, car_plate_number, car_brand_name, car_model, car_color, car_rental_rate, car_image) {
    return '<div class="col-lg-4 col-md-4 col-sm-4">'+
                '<div class="single-product">'+
                    '<div class="product-img">'+
                        '<a href="#" onclick="getcarbyplatenumber(\''+car_plate_number+'\');">'+
                            '<img class="primary-image" src="../../shoptemplate/img/product/women/8.jpg" alt="" />'+
                            '<img class="secondary-image" src="../../shoptemplate/img/product/women/3.jpg" alt="" />'+
                        '</a>'+
                        '<h2 class="product_title"><a href="#" onclick="getcarbyplatenumber(\''+car_plate_number+'\');">'+car_model+'</a></h2>'+                          
                    '</div>'+
                '</div>'+
            '</div>'

}

function getcarbybrand(car_brandname) {
    $.ajax({
        url: 'http://127.0.0.1:5000/car/brand/'+car_brandname,
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            $("#carbybrandecommerce").html("");
            if(res.status=='Ok'){
                for (i=0; i<res.count; i++ ) {
                    car_plate_number = res.entries[i].car_plate_number; 
                    car_category_name = res.entries[i].car_category_name;
                    car_model = res.entries[i].car_model;
                    car_color = res.entries[i].car_color;
                    car_rental_rate = res.entries[i].car_rental_rate;
                    car_image = res.entries[i].car_image;
                    car_owner_id = res.entries[i].car_owner_id;
                    $("#carbybrandecommerce").append(getcarbybrandhtml(car_owner_id, car_plate_number, car_model, car_color, car_rental_rate, car_image, car_category_name));
                }
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addcarpage").hide();
                $("#carspage").show();
                $("#addownerpage").hide();
                $("#updatecarpage").hide();
                $("#carsecommerce").hide()

            } else if(res.status==='Error') {
                $("#carbybrandecommerce").html("");
                alert('Error')
            }
        }
    });
}

function getcarbybrandhtml(car_owner_id, car_plate_number, car_model, car_color, car_rental_rate, car_image, car_category_name) {
    return '<div class="col-lg-4 col-md-4 col-sm-4">'+
                '<div class="single-product">'+
                    '<div class="product-img">'+
                        '<a href="#" onclick="getcarbyplatenumber(\''+car_plate_number+'\');">'+
                            '<img class="primary-image" src="../../shoptemplate/img/product/women/8.jpg" alt="" />'+
                            '<img class="secondary-image" src="../../shoptemplate/img/product/women/3.jpg" alt="" />'+
                        '</a>'+
                        '<h2 class="product_title"><a href="#" onclick="getcarbyplatenumber(\''+car_plate_number+'\');">'+car_model+'</a></h2>'+                          
                    '</div>'+
                '</div>'+
            '</div>'

}

function getcarbycategorybrandname(car_category_name, car_brandname) {
    $.ajax({
        url: 'http://127.0.0.1:5000/car/category/'+car_category_name+'/brand/'+car_brandname,
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            $("#carbycategorybrandecommerce").html("");
            if(res.status=='Ok'){
                for (i=0; i<res.count; i++ ) {
                    car_plate_number = res.entries[i].car_plate_number; 
                    car_model = res.entries[i].car_model;
                    car_color = res.entries[i].car_color;
                    car_rental_rate = res.entries[i].car_rental_rate;
                    car_image = res.entries[i].car_image;
                    car_owner_id = res.entries[i].car_owner_id;
                    $("#carbycategorybrandecommerce").append(getcarbybrandcategoryhtml(car_owner_id, car_plate_number, car_model, car_color, car_rental_rate, car_image));
                }
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addcarpage").hide();
                $("#carspage").show();
                $("#addownerpage").hide();
                $("#updatecarpage").hide();
                $("#carsecommerce").hide()

            } else if(res.status==='Error') {
                $("#carbycategorybrandecommerce").html("");
                alert('Error')
            }
        }
    });

}

function getcarbybrandcategoryhtml(car_owner_id, car_model, car_color, car_rental_rate, car_image, car_plate_number) {
    return '<div class="col-lg-4 col-md-4 col-sm-4">'+
                '<div class="single-product">'+
                    '<div class="product-img">'+
                        '<a href="#" onclick="getcarbyplatenumber(\''+car_plate_number+'\');">'+
                            '<img class="primary-image" src="../../shoptemplate/img/product/women/8.jpg" alt="" />'+
                            '<img class="secondary-image" src="../../shoptemplate/img/product/women/3.jpg" alt="" />'+
                        '</a>'+
                        '<h2 class="product_title"><a href="#" onclick="getcarbyplatenumber(\''+car_plate_number+'\');">'+car_model+'</a></h2>'+                          
                    '</div>'+
                '</div>'+
            '</div>'

}