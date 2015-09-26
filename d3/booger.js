var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], 0.1);

      var x1 = d3.scale.ordinal();

      var y = d3.scale.linear()
        .range([height, 0]);

      var color = d3.scale.ordinal()
        .range(["#9DCE9D", "#8a89a6"]);

      var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

      var svg = d3.select("#groupcontainer").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var dictionary = {
        CA:"San Francisco",
        FL:"Miami",
        MA:"Boston",
        PA:"Philadelphia",
        IL:"Chicago",
        NY:"Manhattan"
        };

      var data =
        "State,Rate of HIV/AIDS per 100000 by City,Rate of HIV/AIDS per 100000 by State\nCA,1043,375\nFL,1038,599\nIL,383,324\nMA,413,334\nNY,2046,782\nPA,861,290";
        data = d3.csv.parse(data);

      var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "State"; });

      data.forEach(function(d) {
        d.ages = ageNames.map(function(name) { 
          return {name: name, value: +d[name]}; }); });
        x0.domain(data.map(function(d) { 
          return d.State; }));
        x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
        y.domain([0, d3.max(data, function(d) { 
          return d3.max(d.ages, function(d) { 
            return d.value; }); })]) ;

      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      var state = svg.selectAll(".state")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; });

      state.selectAll("rect")
        .data(function(d) { return d.ages; })
        .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.name); })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .style("fill", function(d) { return color(d.name); });

      svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

      svg.append("g")
        .selectAll("text.city")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "city")
        .text(function(d){
          return dictionary[d.State];
        })
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "end")
        .attr("fill", "black")
        .attr("y", function(d) {
          return x0(d.State) - 2;
        })
        .attr("x", function(d) {
          return -y(d.ages[0].value);
        });

      var grouplegend = svg.selectAll(".legend")
        .data(ageNames.slice().reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        grouplegend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

        grouplegend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { 
          if(d === "Rate of HIV/AIDS per 100000 by State"){
            return "Rate of HIV/AIDS per 100,000 by State";
          } else {
            return "Rate of HIV/AIDS per 100,000 by City";
          }     
        });
        
