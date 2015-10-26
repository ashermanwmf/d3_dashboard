function getdata() {
/* test to see if I can read json to my html 
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
*/
/* trying to get a search box to work for my data (starting simple - adding drop down list of choices while searching next) */
$('#search').on('click', function() {
    $.ajax({ 
            url: '/dashboard/includes/data/october',
            type: 'POST',
            success: function(data) {
                d3_test(data); 
                /* Search for an item in the  */
                var search_field = $('#searchterm').val();
                for (i = 0; i < data.length; i++) {
                    if (search_field == data[i].FIELD1) {
                       $('#demo2').append("This exists");
                    } else {
                        $('#demo2').html("Try again."); 
                    }
                }
            }
    });
      $.ajax({ 
            url: '/dashboard/includes/data/september',
            type: 'POST',
            success: function(data) {
                d3_test(data);
                var search_field = $('#searchterm').val();
                for (i = 0; i < data.length; i++) {
                    if (search_field == data[i].FIELD1) {
                       $('#demo2').append("This exists");
                    } else {
                        $('#demo2').html("Try again."); 
                    }
                }
            }
    }); 
            
});

}
    
function d3_test(data) {

    console.log(data)

};
