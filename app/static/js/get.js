function getcars() {
    $.ajax({
        url: 'http://127.0.0.1:5000/cars',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            $("#cars").html("");
            if(res.status=='Ok'){
                for (i=0; i<res.count; i++ ) {
                    car_plate_number = res.entries[i].car_plate_number; 
                    car_brand_name = res.entries[i].car_brand_name;
                    car_model = res.entries[i].car_model;
                    car_color = res.entries[i].car_color;
                    car_rental_rate = res.entries[i].car_rental_rate;
                    car_image = res.entries[i].car_image;
                    car_owner_id = res.entries[i].car_owner_id;
                    $("#cars").append(getcarshtml(car_owner_id, car_plate_number, car_brand_name, car_model, car_color, car_rental_rate, car_image));
                }
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addcarpage").hide();
                $("#carspage").show();
                $("#addownerpage").hide();
                $("#updatecarpage").hide();
            } else {
                $("#cars").html("");
                alert('Error')
            }
        }
    });
}

function getcarshtml(car_owner_id, car_plate_numbers, car_brand_name, car_model, car_color, car_rental_rate, car_image) {
    return '<tr> ' +
            '<td>' + car_owner_id + '</td>' +
            '<td>'+ '<a href="#" onclick="getcarbyplatenumber(\''+car_plate_number+'\');">' + car_plate_number + '</a>'+'</td>' +
            '<td>' + car_brand_name + '</td>' +
            '<td>' + car_model + '</td>' +
            '<td>' + car_color + '</td>' +
            '<td>' + car_rental_rate + '</td>' +
            '<td>' + car_image + '</td>' +
            '<td>' + '<div class="ti-pencil-alt"> update' + '</td>' + 
            '<td>' + '<div class="ti-trash"> delete' + '</td>' +                     
            '</tr>'
}

function getcarbyplatenumber(car_plate_number){
    $.ajax({
        url: 'http://127.0.0.1:5000/car/'+car_plate_number,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#cardetails").html("");
            if(res.status=='Ok'){
                for(i=0; i<res.count; i++) {
                    car_color = res.entries[i].car_color;
                    car_brand_name = res.entries[i].car_brand_name;
                    car_model = res.entries[i].car_model;
                    car_rental_rate = res.entries[i].car_rental_rate;
                    car_image = res.entries[i].car_image;
                    car_owner_id = res.entries[i].car_owner_id;
                    $("#cardetails").append(getcardetailshtml(car_owner_id, car_brand_name, car_model, car_color, car_rental_rate, car_image))
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

function getcardetailshtml(car_owner_id, car_brand_name, car_model, car_color, car_rental_rate, car_image) {
    return '<tr> ' +
            '<td>' + car_owner_id + '</td>' +
            '<td>' + car_brand_name + '</td>' +
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