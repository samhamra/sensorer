
// Create an empty sensor object as a global
var office = {};
var recreational = {}
recreational.data = "";
office.data = "";
var recreationalSensorKey = 'dPjyGN0bx0IDgO000D4lI6leJGK';
var officeSensorKey = 'GqXO9z3ae9tODKPPPO2YHxw39By'

// A subscriber's key (other keys are available at http://80.69.174.27:8080/streams/)
var sensorURL = 'http://80.69.174.27:8080/output/';


var headers = ['barometric pressure (Pa)', 'temperature (°C)', 'lumination (lux)', 'carbon dioxide (ppm)']
var varNames = ['p', 't', 'l', 'c'];
var currentgraph = -1;

getJSON(recreationalSensorKey, recreational);
getJSON(officeSensorKey, office);


$(window).resize(function(){
  drawChart(recreational.data, office.data, currentgraph);
});


function drawChart(recreationalData, officeData, index) {
      if(index< 0) {
        return;
      }
			 console.log("DRAWCHART")
			 var variable = varNames[index];
			 var header = headers[index];
			 var lines = [];

			 lines.push(['date', 'recreational', 'office'])
			recreationalData.forEach(function(row) {
				lines.push([new Date(Date.parse(row.timestamp)), parseFloat(row[variable]), null])

			})
			officeData.forEach(function(row) {
				lines.push([new Date(Date.parse(row.timestamp)), null, parseFloat(row[variable])])

			})

			 var data = google.visualization.arrayToDataTable(lines);
			 var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
			 var options = {
				 interpolateNulls: true,
				 title: header
			 };

			 chart.draw(data, options);
		 }

// Function to retrieve data, placing it in a "response" object
function getJSON(key, area) {
            $.ajax({
                    url: sensorURL + key + ".json?gt[timestamp]=now-1day",
                    jsonp: "callback",
                    cache: true,
                    dataType: "jsonp",
                    data: {
                      page: 1
                    },
                    success: function(response)
                        {
                            if (response && response[0])
                                {

																	    area.data = response;

                                }
                        }
                });
}

function getData(index) {
  currentgraph = index;
	google.charts.load('current', {'packages':['annotationchart']});
	google.charts.setOnLoadCallback(function () {
		console.log("getData")
	  drawChart(recreational.data, office.data, currentgraph);
	});
}
