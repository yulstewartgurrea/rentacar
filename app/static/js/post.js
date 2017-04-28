function addowner() {
	var owner_first_name = $('#owner_first_name').val();
	var owner_last_name = $('#owner_last_name').val();
	var owner_address1 = $('#owner_address1').val();
	var owner_address2 = $('#owner_address2').val();
  	var owner_mobile_no = $('#owner_mobile_no').val();

	var data = JSON.stringify({'first_name': owner_first_name, 'last_name': owner_last_name,
							'owner_address1': owner_address1, 'owner_address2': owner_address2,
							'owner_mobile_no': owner_mobile_no})

	$.ajax({
		url: 'http://127.0.0.1:5000/owner'+owner_first_name+'/'+owner_last_name+,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: data,
		dataType: 'json',
		success: function(res){
			console.log(res);
            if(res.message=='Ok') {
                alert("Owner Added")
            } else {
                alert(res.message)
            }
        }

	});

}

function addcar() {

	var plate_number = $('#plate_number').val();
	var owner = $('#owner').val();
	var brand_name = $('#brand_name').val();
	var model = $('#model').val();
	var color = ('#color').val();
	var image = ('#image').val();
	var rental_rate = ('#rental_rate').val();

	var data = JSON.stringify({'plate_number': plate_number, 'owner': owner, 'brand_name': brand_name,
							'model': model, 'color': color, 'image': image, 'rental_rate': rental_rate})

	$.ajax({
		url: 'http://127.0.0.1:5000/car'+plate_number+'/'+brand_name+'/'+model+'/'+rental_rate,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json',
        success: function(res){
        	console.log(res);
            if(res.message=='Ok') {
                alert("Vehicle Added!")
            } else {
                alert(res.message)
            }
        }
	});

}