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
                    $("#categories2").append(getcategoryhtml(category_name));
                }

                for(i=0; i<res.countbrands; i++){
                    brandname = res.brands[i].brandname;
                    $("#brands2").append(getbrandhtml(brandname))                   
                }
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addcarpage").hide();
                $("#carspage").show();
                $("#addownerpage").hide();
                $("#updatecarpage").hide();
                $("#shoppage").show();

            } else {
                $("#cars").html("");
                alert('Error')
            }
        }
    });
}

function getcategoryhtml(category_name) {
    return '<li>'+'<a href="#">' +category_name+ '</a>'+'</li>'
}

function getbrandhtml(brandname) {
    return ''
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
                        '<a href="#">'+
                            '<img class="primary-image" src="../../shoptemplate/img/product/women/8.jpg" alt="" />'+
                            '<img class="secondary-image" src="../../shoptemplate/img/product/women/3.jpg" alt="" />'+
                        '</a>'+
                        '<h2 class="product-name"><a href="#">'+car_model+'</a></h2>'+
                        '<div class="actions">'+
                            '<div class="action-buttons">'+
                                '<div class="add-to-cart">'+
                                    '<a href="#">Add to cart</a>'+
                                '</div>'+
                                '<div class="add-to-links">'+
                                    '<div class="add-to-wishlist">'+
                                        '<a href="#" data-toggle="tooltip" title="Add to Wishlist"><i class="fa fa-star"></i>'+
                                        '</a>'+
                                    '</div>'+
                                    '<div class="compare-button">'+
                                        '<a href="#" data-toggle="tooltip" title="Compare"><i class="fa fa-exchange"></i></a>'+
                                    '</div>'+                                  
                                '</div>'+
                                '<div class="quickviewbtn">'+
                                    '<a href="#" data-toggle="tooltip" title="Quick View"><i class="fa fa-search-plus"></i></a>'+
                                '</div>'+
                            '</div>'+
                       ' </div>'+                          
                    '</div>'+
                    '<div class="product-content">'+
                        '<h2 class="product-name"><a href="#">Light house shoes</a></h2>'+
                        // '<div class="pro-rating">'+
                            // <a href="#"><i class="fa fa-star"></i></a>
                            // <a href="#"><i class="fa fa-star"></i></a>
                            // <a href="#"><i class="fa fa-star"></i></a>
                            // <a href="#"><i class="fa fa-star"></i></a>
                            // <a href="#"><i class="fa fa-star"></i></a>
                        // </div>
                        // <div class="price-box">
                        //     <span class="new-price">£90.00</span>
                        // </div>
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
                }
                $("#updatecarpage").show();
                $("#carspage").hide();
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

function getcarbycategory(car_category_name) {
    $.ajax({
        url: 'http://127.0.0.1:5000/car/category/'+car_category_name,
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            $("#carbycategory").html("");
            if(res.status=='Ok'){
                for (i=0; i<res.count; i++ ) {
                    car_plate_number = res.entries[i].car_plate_number; 
                    car_brandname = res.entries[i].car_brandname;
                    car_model = res.entries[i].car_model;
                    car_color = res.entries[i].car_color;
                    car_rental_rate = res.entries[i].car_rental_rate;
                    car_image = res.entries[i].car_image;
                    car_owner_id = res.entries[i].car_owner_id;
                    $("#carbycategory").append(getcarbycategoryhtml(car_owner_id, car_plate_number, car_brand_name, car_model, car_color, car_rental_rate, car_image));
                }
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addcarpage").hide();
                $("#carspage").show();
                $("#addownerpage").hide();
                $("#updatecarpage").hide();
            } else {
                $("#carbycategory").html("");
                alert('Error')
            }
        }
    });
}