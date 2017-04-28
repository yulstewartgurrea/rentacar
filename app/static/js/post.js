function addowner() {
	var owner_first_name = $('#owner_first_name').val();
	var owner_last_name = $('#owner_last_name').val();
	var owner_address1 = $('#owner_address1').val();
	var owner_address2 = $('#owner_address2').val();
  	var owner_mobile_no = $('#owner_mobile_no').val();

	var data = JSON.stringify({"owner_first_name": owner_first_name, "owner_last_name": owner_last_name,
							"owner_address1": owner_address1, "owner_address2": owner_address2,
							"owner_mobile_no": owner_mobile_no})

	$.ajax({
		url: 'http://127.0.0.1:5000/owner/'+owner_last_name+'/'+owner_last_name,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: data,
		dataType: 'json',
		success: function(res){
			console.log(res);
            if(res.status==='Ok') {
                alert("Owner Added")
            } else {
                alert(res.message)
            }
        }

	});

}

function addcar() {
	var car_plate_number = $('#car_plate_number').val();
	var car_owner_id = $('#car_owner_id').val();
	var car_brand_name = $('#car_brand_name').val();
	var car_model = $('#car_model').val();
	var car_color = $('#car_color').val();
	var car_image = $('#car_image').val();
	var car_rental_rate = $('#car_rental_rate').val();

	var data = JSON.stringify({"car_plate_number": car_plate_number, "car_owner_id": car_owner_id, "car_brand_name": car_brand_name,
							"car_model": car_model, "car_color": car_color, "car_image": car_image, "car_rental_rate": car_rental_rate})

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
        }
	});

}