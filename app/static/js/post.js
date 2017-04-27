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
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType: 'json',
        success: function(res){
            if(res.message=='Ok') {
                alert("Admin Added")
            } else {
                alert(res.message)
            }
        }
	});

}