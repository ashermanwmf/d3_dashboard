function getdata() {
$('#button').on('click', function() {
                $.ajax({
                    url: 'data',
                    type: 'POST',
                    success: function(data) {
                        d3_test(data);
                        $('#demo').html(data.age);
                    }
                });
                $.ajax({ 
                    url: '/dashboard/includes/data/october',
                    type: 'POST',
                    success: function(data) {
                        d3_test(data);
                        $('#demo2').html(data[1].FIELD2);
                    }
                }); 
});

function d3_test(data) {

    console.log(data)

}

     $('#searchterm').on('click', function() {
                $.ajax({ 
                    url: '/dashboard/includes/data/september',
                    type: 'POST',
                    success: function(data) {
                        d3_test(data);
                        $('#demo3').html(data[1].FIELD2);
                    }
                });  
            });