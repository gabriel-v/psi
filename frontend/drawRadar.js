'use strict';
function getAxisFromScores(scores) {
    var Options = ["A", "B", "C", "D"];
    var OptionLabels = {
        "A": "Cultură de tip clan",
        "B": "Cultură autocrată",
        "C": "Cultură de piață",
        "D": "Cultură ierarhică"
    };
    var objs = [];
    for(var i in Options) {
        var o = Options[i];
        objs.push({
            axis: OptionLabels[o],
            value: scores[o] / 100.0
        });
    }

    return objs;
}

function drawRadarChart(element_id, scores1, scores2) {

    var w = 200,
        h = 200;

    var colorscale = d3.scale.category10();

    var LegendOptions = ['Actuale', 'Dorite'];

    var data1 = getAxisFromScores(scores1);
    var data2 = getAxisFromScores(scores2);

    var d = [data1, data2];

    var cfg = {
        w: w,
        h: h,
        maxValue: 0.75,
        levels: 5,
        color: colorscale,
        ExtraWidthX: 300
    };

    RadarChart.draw("#" + element_id, d, cfg);

var svg = d3.select("#" + element_id)
	.selectAll('svg')
	.append('svg')
	.attr("width", w)
	.attr("height", h);


var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 100)
	.attr('transform', 'translate(-60,30)');

	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);});

	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "9px")
	  .attr("fill", "#111111")
	  .text(function(d) { return d; });
}