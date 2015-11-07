function getdata() {
	var svgContainer = d3.select("div#svg").append("svg")
                                     	.attr("width", 700)
                                  		.attr("height", 1000);
	// Live Search Works 
    $("#search").autocomplete({
        source: function(request, response) {
            $.ajax({
                type: "POST",
                url: "/dashboard/includes/data/september",
                success: function(data) {
					data.sort(function(a, b) {
						// if a is less than b then 1 elseif b is less than a then -1 else 0
						return (a.FIELD2 < b.FIELD2) ? 1 : ((b.FIELD2 < a.FIELD2) ? -1 : 0);
					});
					ret = [];
					for(i = 0; i < data.length; i++) {
						if (data[i].FIELD1.toLowerCase().indexOf(request.term.toLowerCase()) === 0) {
							// console.log(data[i]);
							ret.push(data[i].FIELD1);
						}
					}
					// console.log(ret);
					response(ret);
                }
            });
        },
        minLength: 1,
        select: function(event, ui) {
			var x1 = 0, x2 = 0, y1, y2;
			d3.json('/dashboard/includes/data/september.json', function(data){
				$(data).each(function() {
					self = this;
					// ui.item is what is returned from search
					if(self.FIELD1 == ui.item.value) {
						y1 = self.FIELD2;
						x1 = 1;
						d3.json('/dashboard/includes/data/october.json', function(_data){
							$(_data).each(function() {
								_self = this;
								// ui.item is what is returned from search
								if(_self.FIELD1 == ui.item.value) {
									y2 = _self.FIELD2;
									x2 = 1000;
									console.log(y1 + " " + y2);
									
									var circle = svgContainer.append("line")
															.attr("x2", x1)
															.attr("y1", y1)
															.attr("x1", x2)
															.attr("y2", y2)
															.attr("stroke-width", 6)
															.attr("stroke", $('.item:first').css('background-color'));
								}
							});
						});
					}
				});
//				d3.value(data, function(d){
//					return parseInt(d.FIELD2);
//				}));
			});
			
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
	
	// select the month views for the value of the search selections
	
	
	$("#month").on('change', function() {
		console.log($(this).val());
		var month = $(this).val();
		
		d3.json('/dashboard/includes/data/'+month+'.json', function(data){
			console.log(d3.max(data, function(d){
				return parseInt(d.FIELD2);
			}));
		});
	});
	/* d3.json('/dashboard/includes/data/september.json', function(data){
		console.log(d3.max(data, function(d){
			return parseInt(d.FIELD2);
		}));
	});
	
	d3.json('/dashboard/includes/data/october.json', function(data){
		console.log(d3.min(data, function(d){
			return parseInt(d.FIELD2);
		}));
	});
	
	*/
}
