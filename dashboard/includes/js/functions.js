function getdata() {
    
    // create svg space for d3 graph
	var svgContainer = d3.select("div#svg").append("svg")
                                     	.attr("width", 700)
                                  		.attr("height", 1000);
    var x = { selectedStories: [] };
    
    // var selectedStories = [];
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
			d3.json('dashboard/includes/data/september.json', function(data){
				$(data).each(function() {
					self = this;
					// ui.item is what is returned from search
					if(self.FIELD1 == ui.item.value) {
						d3.json('dashboard/includes/data/october.json', function(_data){
							$(_data).each(function() {
								_self = this;
								// ui.item is what is returned from search
                                // creating a list of chosen items from search
								if(_self.FIELD1 == ui.item.value) {
                                    var september = {
                                        article : _self.FIELD1,
                                        views : self.FIELD2,
                                        labels : "september"
                                    };
                                    var october = {
                                        article : _self.FIELD1,
                                        views : _self.FIELD2,
                                        labels : "october"
                                    };
                                    
//                                    var elem = {
//                                        title   : _self.FIELD1,
//                                        y1      :  self.FIELD2,
//                                        x1      : 1,
//                                        y2      : _self.FIELD2,
//                                        x2      : 500
//                                    };
                                    // the json list of stories chosen to help with scale
                                    x.selectedStories.push(september, october);
                                    console.log(x);
                                    redrawList();
								}
							});
						});
					}
				});
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
    
    // This doesn't clear the old scale first
    function recalculateScale() {
        // There's no real number bigger than plus Infinity
        var lowest = Number.POSITIVE_INFINITY;
        var highest = Number.NEGATIVE_INFINITY;
        var y1, y2;
        for (var i=x.selectedStories.length-1; i>=0; i--) {
            y1 = x.selectedStories[i].y1;
            y2 = x.selectedStories[i].y2;
            
            if (y1 < lowest) lowest = y1;
            if (y2 > highest) highest = y2;
        }
        
        return d3.scale.linear().domain([lowest, highest]).range([0, 500]);
    }
    
    function redrawList() {
        // Build the article's dataset.
              var labels = x.selectedStories.map(function (elem) { return elem.labels; });
              var values = x.selectedStories.map(function (elem) { return elem.views; });
              var datasets = [];
              datasets.push({
                fillColor: 'rgba(0,0,0,0)',
                strokeColor: 'RGBA(200, 41, 119, 1)',
                pointColor: 'RGBA(200, 41, 119, 1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'RGBA(200, 41, 119, 1)',
                data: values
              });
              // When all article datasets have been collected,
              // initialize the chart.
              if (datasets.length > 0) {
                var data = {labels: labels, datasets: datasets};
                var options = {bezierCurve: false};
                var context = $(config.chart).get(0).getContext('2d');
                config.articleComparisonChart = new Chart(context).Line(data, options);
              }
        
        x.selectedStories = [];

        // Somethign here that resets the svgcontainer so that there isnt anything inside of it
        // Need to be careful not to clear the newly reset scale...might want to run this before?
//        $(svgContainer).html("");
//        var xAxis = d3.svg.axis().scale(recalculateScale());
//        $(x.selectedStories).each(function() {
//            var elem = this;
//            var circle = svgContainer.append("line")
//                                .attr("x2", elem.x1)
//                                .attr("y1", elem.y1)
//                                .attr("x1", elem.x2)
//                                .attr("y2", elem.y2)
//                                .attr("stroke-width", 6)
//                                .attr("stroke", $('.item:first').css('background-color'));
//
//            //Create a group Element for the Axis elements and call the xAxis function
//            var xAxisGroup = svgContainer.append("g").call(xAxis);
//        });
    }

    
	// add colors to the log messages
	function log(message) {
		var back = ["RGBA(0, 159, 85, 1)","RGBA(30, 112, 162, 1)","RGBA(200, 41, 119, 1)"];
		var rand = back[Math.floor(Math.random() * back.length)];
        $("<div class='item' style='background-color: "+rand+"'>").text(message).prependTo("#log");
        $("#log").scrollTop(0);
    }
    
     var config = {
        chart: '.aqs-chart',
      };
    
}
