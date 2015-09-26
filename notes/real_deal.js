//it's really happening

var dataset = [ 5, 10, 23, 35, 12, 20, 24, 24, 31, 13, 7 ];

d3.select('body').selectAll('div')
  .data(dataset)
  .enter()
  .append('div')
  .style('height', function(d){
    var barHeight = d * 5;
    return barHeight + 'px';
  });
