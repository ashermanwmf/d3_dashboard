function getdata() {
/* Only need to search in september (can't do it from one search bar yet) */
$('#search_1').on('click', function() {
      $.ajax({ 
          url: '/dashboard/includes/data/september',
          type: 'POST',
          success: function(data) {
              d3_test(data);
              var search_field = $('#searchterm_1').val();
              for (i = 0; i < data.length; i++) {
                  if (search_field == data[i].FIELD1) {
                      $('#choice_1').append('Choice 1: ');
                      $('#choice_1').append(data[i].FIELD1);
                  }
              }
          }
      }); 
            
});

$('#search_2').on('click', function() {
    /* THIS WORKS: basic search for json september, need to make it show options bellow in a list. */
      $.ajax({ 
          url: '/dashboard/includes/data/september',
          type: 'POST',
          success: function(data) {
              d3_test(data);
              var search_field = $('#searchterm_2').val();
              for (i = 0; i < data.length; i++) {
                  if (search_field == data[i].FIELD1) {
                      $('#choice_2').append('Choice 2: ');
                      $('#choice_2').append(data[i].FIELD1);
                  }
              }
          }
      }); 
            
});
    
}
    
function d3_test(data) {

    console.log(data)

};
