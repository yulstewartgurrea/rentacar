function getcustomer(email_address, is_customer, is_active) {
    return '<tr> ' +
            '<td>' + email_address + '</td>' +
            '<td>' + is_customer + '</td>' +
            '<td>' + is_active + '</td>' +
            '</tr>'
}

function getcustomers() {
    $.ajax({
        url: 'http://127.0.0.1:5000/api/get/customers',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            $("#customers").html("");
            if(res.status=='ok'){
                for (i=0; i<res.count; i++) {
                    email_address = res.entries[i].email_address;
                    is_customer= res.entries[i].is_customer;
                    is_active = res.entries[i].is_active;
                    $("#customers").append(getcustomer(email_address, is_customer, is_active));
                }
            } else {
                $("#customers").html("");
                alert('Error')
            }
        }



    });

}