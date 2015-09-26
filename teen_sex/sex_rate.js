<!DOCTYPE html>
<meta charset="utf-8">
<style>

body { font: 12px Arial;}

path { 
    stroke: steelblue;
    stroke-width: 2;
    fill: none;
}

.axis path,
.axis line {
    fill: none;
    stroke: grey;
    stroke-width: 1;
    shape-rendering: crispEdges;
}


</style>
<body>
<script src="http://d3js.org/d3.v3.min.js"></script>


<script>

var margin = {top: 30, right: 40, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var color = d3.scale.category10();

//tell it the year is a date
var parseDate = d3.time.format("%Y").parse

var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);
    
var yAxis = d3.svg.axis().scale(y0)
    .orient("left").ticks(5);

//var yAxisRight = d3.svg.axis().scale(y1)
//    .orient("right").ticks(5); 

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y0(d.rate); });
  
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("dual_data.csv", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) {return key !== "year"; }));
data.forEach(function(d) {
    d.year = parseDate(d.year);
    d.sex_rate = +d.sex_rate;
    d.pregnancy_rate = +d.pregnancy_rate;
});

var rates = color.domain().map(function(name){
  return {
    name: name,
    values: data.map(function(d){
      return {date: d.year, rate: +d[name]};
    })
  }
})

 // Scale the range of the data   
x.domain(d3.extent(data, function(d) { return d.year; }));
y0.domain([
  d3.min(rates, function(r) {
return d3.min(r.values, function (v) {return v.rate; }); }), 
  d3.min(rates, function(r) {
  return d3.min(r.values, function (v) {return v.rate; }); }),
  ]);

svg.append("path")        // Add the valueline path.
    .attr("d", valueline(data));

svg.append("path")        // Add the valueline2 path.
    .style("stroke", "#10ab0b")
    .attr("d", valueline2(data));

svg.append("g")            // Add the X Axis
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .style("fill", "steelblue")
    .call(yAxisLeft);	

svg.append("g")				
    .attr("class", "y axis")	
    .attr("transform", "translate(" + width + " ,0)")	
    .style("fill", "#10ab0b")		
    .call(yAxisRight);


});

</script>
</body>