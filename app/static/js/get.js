function getcarhtml(owner_id, plate_number, brand_name, model, color, rental_rate, image) {
    return '<tr> ' +
            '<td>' + owner_id + '</td>' +
            '<td>' + plate_number + '</td>' +
            '<td>' + brand_name + '</td>' +
            '<td>' + model + '</td>' +
            '<td>' + color + '</td>' +
            '<td>' + rental_rate + '</td>' +
            '<td>' + image + '</td>' +
            '</tr>'
}

function getcars() {
    $.ajax({
        url: 'http://127.0.0.1:5000/cars',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            $("#cars").html("");
            if(res.status=='Ok'){
                for (i=0; i<res.count; i++) {
                    plate_number = res.entries[i].plate_number;
                    brand_name = res.entries[i].brand_name;
                    model = res.entries[i].model;
                    color = res.entries[i].color;
                    rental_rate = res.entries[i].rental_rate;
                    image = res.entries[i].image;
                    owner_id = res.entries[i].owner_id;
                    $("#cars").append(getcarhtml(owner_id, plate_number, brand_name, model, color, rental_rate, image));
                }
                $("#mainpage").hide();
                $("#userprofilepage").hide();
                $("#addcarpage").hide();
                $("#carspage").show();
                $("#addownerpage").hide();
            } else {
                $("#cars").html("");
                alert('Error')
            }
        }



    });

}