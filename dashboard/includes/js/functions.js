function getdata() {

    
	
	// added the second data set (october)
	$.ajax({
    	type: "POST",
        url: "/dashboard/includes/data/october",
        success: function(data) {
			//get the max value for views to use as scale in D3 from next month views (larger than september because compounded 				views)
			d3.json('/dashboard/includes/data/october.json', function(d){
				//go through all of the object
				for(i = 0; i < d.length; i++) {
					console.log(d[i].FIELD2);
					// make an array to store object info
					var a = [];
					// added object info to array
					a.push(d[i].FIELD2);
				}
				console.log(a);
				// show me the max value chosen from the array 
				console.log(d3.max(d3.values(a)) + "october");
			});
		}
	});
	
	// Live Search Works 
    $("#search").autocomplete({
        source: function(request, response) {
            $.ajax({
                type: "POST",
                url: "/dashboard/includes/data/september",
                success: function(data) {
							//get the min value for views to use as scale in D3 from next month views
							d3.json('/dashboard/includes/data/september.json', function(data){
									// same as above
									for(i = 0; i < data.length; i++) {
										var l = [ ];
										l.push(data[i].FIELD2);
									}
									console.log(d3.min(l) + "September");
							});
							// console.log(data);
							data.sort(function(a, b) {
							return (a.FIELD2 < b.FIELD2) ? 1 : ((b.FIELD2 < a.FIELD2) ? -1 : 0);
						});
						ret = [];
						for(i = 0; i < data.length; i++) {
							if (data[i].FIELD1.toLowerCase().indexOf(request.term.toLowerCase()) === 0) {
								// console.log(data[i]);
								ret.push(data[i].FIELD1 +" " + data[i].FIELD2);
							}
						}
							// console.log(ret);
							response(ret);
                }
            });
        },
        minLength: 3,
        select: function(event, ui) {
            console.log(event);
			console.log(ui);
			log(ui.item ?
				ui.item.label :
                "Nothing selected, input was " + this.value);
			
        },
        open: function() {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function() {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        }
    });
	
	// add colors to the log messages
	function log(message) {
		var back = ["RGBA(0, 159, 85, 1)","RGBA(30, 112, 162, 1)","RGBA(200, 41, 119, 1)"];
		var rand = back[Math.floor(Math.random() * back.length)];
        $("<div class='item' style='background-color: "+rand+"'>").text(message).prependTo("#log");
        $("#log").scrollTop(0);
    }

	
}


/* 

function d3_test(data) {

    console.log(data)

};


	$.ajax({
                      type: "POST",
					  contentType: "/dashboard/includes/data/september; charset=utf-8",
					  dataType: 'json',
					  async: true,
					  data: "{}", 
					  success: function (data) {
                        q: request.term
                      },
                      success: function( data ) {
                          console.log(data);
                          response( data );
                      }
                    }); */


/* Only need to search in september (can't do it from one search bar yet) 
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
         THIS WORKS: basic search for json september, need to make it show options bellow in a list. 
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
        url: "/dashboard/includes/data/september",
        success: function(data) { 
			console.log(data);
			
        },
        error: function(result) {}
    });
*/
