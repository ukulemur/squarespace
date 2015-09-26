var ExpressGrowth = function(data) {
  this.init = function(){
    this.draw().drawLegend();
  };
  var self = this;
  var wrapperElement = '#express-growth-chart';
  var uidCounter = 0;
  var padding = { top: 30, right: 40, bottom: 40, left: 40 };
  var axisPadding = 35;
  var containerWidth = parseInt($(wrapperElement).css("width"), 10) || 700;
  var width = containerWidth - padding.left - padding.right - axisPadding;
  var containerHeight = 300;
  var height = containerHeight - padding.top - padding.bottom;
  var barWidth = 15;
  var transitionDuration = 50;
  var monthlyFormat = d3.time.format("%B %Y");
  var dailyFormat = d3.time.format("%Y-%m-%d");
  var commaFormat = d3.format(",d");
  var legendBoxDim = 10;
  var legendBoxSpace = 70;
  var colors = ["#9BCB58", "#C9CDD4", "#002782"];
  var color = d3.scale.linear().range(colors);
  var x = d3.time.scale()
    .range([0, width]);
  var y = d3.scale.linear()
    .range([height, 0]);
  var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(5)
    .tickSize(10)
    .orient("bottom");
  var yAxis = d3.svg.axis()
    .scale(y)
    .ticks(10)
    .tickSize(width + barWidth)
    .orient("right");
  var svg = d3.select(wrapperElement).append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + containerWidth + " " + containerHeight)
    .append("g")
      .attr("height", height - padding.top)
      .attr("transform", "translate(60, " + padding.bottom + ")");
  var xAxisContainer = svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + barWidth / 2 + "," + height + ")");
  var yAxisContainer = svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + 0 + ",0)");
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0]);
  var dailyData = data.map(function(d){
    d.uid               = ++uidCounter;
    d.the_date          = dailyFormat.parse(d.the_date);
    d.non_express_conts = parseInt(d.non_express_conts, 10);
    d.new_sources       = parseInt(d.new_sources, 10);
    d.rate              = d.new_sources / d.non_express_conts;
    d.type              = 'daily';
    return(d);
  });
  var monthlyData = (function(){
    var grouped = _.groupBy(dailyData, function(day){
      var year = day.the_date.getFullYear(),
        month = day.the_date.getMonth();
      return new Date(year, month);
    });
    var reduced = Object.keys(grouped).map(function(key, _i){
      var vals = grouped[key];
      var obj = {
        non_express_conts: 0,
        new_sources: 0
      };
      Object.keys(obj).forEach(function(metric, _i){
        obj[metric] = _.reduce(vals, function(sum, datum) { return sum + datum[metric]; }, 0);
      });
      var monthData = _.extend(obj, {
        uid: ++uidCounter,
        the_date: new Date(Date.parse(key)),
        rate: obj.new_sources / obj.non_express_conts,
        type: 'monthly'
      });
      return monthData;
    });
    return reduced;
  }());
  this.data = dailyData.concat(monthlyData);
  function rate(d) { return d.rate; }
  function key(d) { return d.uid; }
  this.draw = function(timePeriod) {
    var self = this,
      timePeriod = timePeriod || 'monthly';
    function trimDataset(dataset) {
      var newData = dataset.filter(function(d){ return d.type === timePeriod; });
      if ( timePeriod === 'daily' ) {
        newData = newData.sort(function(a, b){ return b.the_date - a.the_date; }).slice(0, 30);
      }
      return(newData);
    }
    <!-- var _data = trimDataset(this.data);
    color.domain([
      d3.min(_data, rate),
      d3.median(_data, rate),
      d3.max(_data, rate)
    ]);
    x.domain(d3.extent(_data, function(d) { return d.the_date; }));
    y.domain([0, d3.max(_data, function(d) { return d.new_sources; })]);
    tip.html(function(d) {
      var rate = (d.rate * 100).toFixed(1) + '%';
      var date = timePeriod === 'Monthly' ? monthlyFormat(d.the_date) : dailyFormat(d.the_date);
      var sources = commaFormat(d.new_sources);
      return(['Date: ' + date, 'Conversion rate: ' + rate, 'New Express: ' + sources].join('<br>'));
    });
    var bar = svg.call(tip).selectAll("rect.exp-bar")
      .data(_data, key);
    xAxisContainer.transition().duration(500).call(xAxis);
    yAxisContainer.transition().duration(500).call(yAxis);
    yAxisContainer.selectAll("text")
      .attr("transform", "translate(" + -(width + padding.right + axisPadding) + ", 0)");
    bar.exit()
      .transition()
      .duration(function(_d, i){ return i * transitionDuration; })
      .attr("x", function(_d, _i){ return timePeriod === "monthly" ? width + barWidth : -barWidth; })
      .style("opacity", 0)
      .remove();
    bar.enter().append("rect")
      .classed("exp-bar", true)
      .attr("x", function(d) { return x(d.the_date); })
      .attr("y", function(d) { return y(d.new_sources); })
      .attr("width", function(d) { return barWidth; })
      .attr("height", 0)
      .attr("fill", function(d) { return color(d.rate); })
      .attr("y", function(d) { return height; })
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide)
      .transition().delay(function(_d, i){
        return i * transitionDuration * (timePeriod === "monthly" ? 2 : (1/2)) + transitionDuration;
      })
      .attr("height", function(d) { return height - y(d.new_sources); })
      .attr("y", function(d) { return y(d.new_sources); });
    return(this);
  }; -->
  this.drawLegend = function(){
    //hack a legend:
    svg.insert('text').text('Conversion rates: ').attr('y', -20).attr('x', 0);
    colors.forEach(function(color, i){
      var labels = ['Min', "Med", "Max"];
      svg.insert('rect', ':first-child')
      .attr('y', -30)
      .attr('x', 125 + (i * legendBoxSpace))
      .attr('width', legendBoxDim)
      .attr('height', legendBoxDim)
      .attr('fill', color);
      svg.insert('text', ':first-child')
        .text(labels[i])
        .attr('y', -20)
        .attr('x', 140 + (i * legendBoxSpace));
    });
  };
}
