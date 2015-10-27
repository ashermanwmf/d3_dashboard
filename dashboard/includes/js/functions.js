var Story_One = '';
var Story_Two = '';

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
                      var Story_One = data[i].FIELD1;
                      $('#choice_1').html('Choice 1: ');
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
                      var Story_Two = data[i].FIELD1;
                      $('#choice_2').html('Choice 2: ');
                      $('#choice_2').append(data[i].FIELD1);
                  }
              }   
          }
      }); 
            
});
    $.ajax({
            type: "POST",
            contentType: "/dashboard/includes/data/september; charset=utf-8",
            url: 'url to your web servise',
            dataType: 'json',
            async: true,
            data: "{}", 
            success: function (data) {
               var pos_data = data;
               div_name = "div.svg";
               draw_svg(div_name, pos_data);
            },
            error: function (result) {
            }
    });
    
/* trying to get live search to work */
 
    function log( message ) {
                  $( "<div>" ).text( message ).prependTo( "#log" );
                  $( "#log" ).scrollTop( 0 );
                }
                $( "#search" ).autocomplete({
                  source: function( request, response ) {
                    $.ajax({
                      url: '/dashboard/includes/data/september.json',
                      dataType: "jsonp",
                      data: {
                        q: request.term
                      },
                      success: function( data ) {
                        response( data );
                      }
                    });
                  },
                  minLength: 3,
                  select: function( event, ui ) {
                    log( ui.item ?
                      "Selected: " + ui.item.label :
                      "Nothing selected, input was " + this.value);
                  },
                  open: function() {
                    $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
                  },
                  close: function() {
                    $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
                  }
                });
    
/* trying to get live search to work */
}
    
function d3_test(data) {

    console.log(data)

};

function draw_svg(reference, pos_data){
}
