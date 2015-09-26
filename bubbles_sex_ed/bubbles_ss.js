<!DOCTYPE html>
<meta charset="utf-8">
<style>

text {
  font: 13px sans-serif;
}

.legend.bubble_legend {
  font-size: 16 px;
}
.legend.bubble_legend rect {
  fill: transparent;
}
.tipsy { font-size: 10px; position: absolute; padding: 5px; z-index: 100000; }
  .tipsy-inner { background-color: #000; color: #FFF; max-width: 200px; padding: 5px 8px 4px 8px; text-align: center; }

  /* Rounded corners */
  .tipsy-inner { border-radius: 3px; -moz-border-radius: 3px; -webkit-border-radius: 3px; }
  
  /* Uncomment for shadow */
  /*.tipsy-inner { box-shadow: 0 0 5px #000000; -webkit-box-shadow: 0 0 5px #000000; -moz-box-shadow: 0 0 5px #000000; }*/
  
  .tipsy-arrow { position: absolute; width: 0; height: 0; line-height: 0; border: 5px dashed #000; }
  
  /* Rules to colour arrows */
  .tipsy-arrow-n { border-bottom-color: #000; }
  .tipsy-arrow-s { border-top-color: #000; }
  .tipsy-arrow-e { border-left-color: #000; }
  .tipsy-arrow-w { border-right-color: #000; }
  
	.tipsy-n .tipsy-arrow { top: 0px; left: 50%; margin-left: -5px; border-bottom-style: solid; border-top: none; border-left-color: transparent; border-right-color: transparent; }
    .tipsy-nw .tipsy-arrow { top: 0; left: 10px; border-bottom-style: solid; border-top: none; border-left-color: transparent; border-right-color: transparent;}
    .tipsy-ne .tipsy-arrow { top: 0; right: 10px; border-bottom-style: solid; border-top: none;  border-left-color: transparent; border-right-color: transparent;}
  .tipsy-s .tipsy-arrow { bottom: 0; left: 50%; margin-left: -5px; border-top-style: solid; border-bottom: none;  border-left-color: transparent; border-right-color: transparent; }
    .tipsy-sw .tipsy-arrow { bottom: 0; left: 10px; border-top-style: solid; border-bottom: none;  border-left-color: transparent; border-right-color: transparent; }
    .tipsy-se .tipsy-arrow { bottom: 0; right: 10px; border-top-style: solid; border-bottom: none; border-left-color: transparent; border-right-color: transparent; }
  .tipsy-e .tipsy-arrow { right: 0; top: 50%; margin-top: -5px; border-left-style: solid; border-right: none; border-top-color: transparent; border-bottom-color: transparent; }
  .tipsy-w .tipsy-arrow { left: 0; top: 50%; margin-top: -5px; border-right-style: solid; border-left: none; border-top-color: transparent; border-bottom-color: transparent; }


</style>

<head>

</head>
<body>
<div id = "chart"></div>
<script>

var legendRectSize = 18;
var legendSpacing = 4;
var w = 800, h = 500; 
var colors = d3.scale.category10();

var diameter = 660,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(2.5);

var svg = d3.select("#chart").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var root = {
 "name": "flare",
 "children": [
  {
     "name": "Education",
     "children": [
      {"name": "Require sex education and HIV education", "size": 21},
      {"name": "Require HIV education only (Not sex education)", "size": 13},
      {"name": "Require that parents be notified that sex education will be provided", "size": 22},
       {"name": "Allow parents to remove their children from instruction", "size": 35}
     ]
    },
    {
     "name": "Contraception",
     "children": [
      {"name": "Require that abstinence be included", "size": 37},
      {"name": "Require that abstinence be stressed", "size": 26},
      {"name": "Require sex education include information on contraception", "size": 18}
     ]
    },
    {
     "name": "Sexual Orientation",
     "children": [
      {"name": "Require discussion of sexual orientation", "size": 12},
      {"name": "Require that discussion of sexual orientation be inclusive", "size": 9}
     ]
    },
    {
     "name": "Content",
     "children": [
      {"name": "Require that information be medically accurate", "size": 13},
      {"name": "Require that information be age appropriate", "size": 27},
       {"name": "Require that the program must provide instruction that is culturally appropriate and not be biased against any race, sex or ethnicity", "size": 8},
      {"name": "Prohibit sexual education from promoting religion", "size": 2},
      {"name": "Require information about skills for healthy sexuality (including avoiding coerced sex) and family communication", "size": 26}
     ]
    }
 ]
}

  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("circle")
      .attr("data-legend",function(d) { return d.packageName; })
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.packageName); })

  node.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.value + " States"; });

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size});
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");

$('svg circle').tipsy({
  gravity: 'w',
  html: true,
  title: function(){
    var d = this.__data__, c = colors(d.i);
    return d.className
  }
});

//legend
var bubble_legend = d3.select("#chart svg").append("g")
  .attr("class", "legend bubble_legend")
  .attr("transform","translate(520,35)")
  .style("font-size","13px")
  .call(d3.legend)

</script>
</body>
</html>
