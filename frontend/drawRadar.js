'use strict';
function getAxisFromScores(scores) {
    var Options = ["A", "B", "C", "D"];
    var objs = [];
    for(var i in Options) {
        var o = Options[i];
        objs.push({
            axis: o,
            value: scores[o]
        });
    }

    return objs;
}

function drawRadarChart(element_id, scores1, scores2) {

    var w = 150,
        h = 150;

    var colorscale = d3.scale.category10();

//Legend titles
    var LegendOptions = ['Actuale', 'Dorite', 'placeholder'];

    var Options = ["A", "B", "C", "D"];
    var OptionLabels = {
        "A": "Cultură de tip clan",
        "B": "Cultură autocrată",
        "C": "Cultură de piață",
        "D": "Cultură ierarhică"
    };

//Data

    var data1 = getAxisFromScores(scores1);
    var data2 = getAxisFromScores(scores2);
    var data3 = [
            {axis: "A", value: 100},
            {axis: "B", value: 100},
            {axis: "C", value: 100},
            {axis: "D", value: 100}
        ];

    var d = [data1, data2, data3];

//Options for the Radar chart, other than default
    var mycfg = {
        w: w,
        h: h,
        maxValue: 0.6,
        levels: 5,
        ExtraWidthX: 300
    };

//Call function to draw the Radar chart
//Will expect that data is in %'s
    RadarChart.draw("#" + element_id, d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////
/*
    var svg = d3.select('#body')
        .selectAll('svg')
        .append('svg')
        .attr("width", w + 300)
        .attr("height", h + 300);

//Create the title for the legend
    var text = svg.append("text")
        .attr("class", "title")
        .attr("x", w + (w / 2))
        .attr("y", h + 80)
        .attr("text-anchor", "middle")
        .attr("font-size", "18px")
        .attr("font-weight", 500)
        .text("Darth Vader");

// //Initiate Legend
    var legend = svg.append("g")
            .attr("class", "legend")
            .attr("height", 100)
            .attr("width", 200)
            .attr('transform', 'translate(90,20)');
    //Create colour squares
    legend.selectAll('rect')
        .data(LegendOptions)
        .enter()
        .append("rect")
        .attr("x", w - 65)
        .attr("y", function (d, i) {
            return i * 20;
        })
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d, i) {
            return colorscale(i);
        });
    //Create text next to squares
    legend.selectAll('text')
        .data(LegendOptions)
        .enter()
        .append("text")
        .attr("x", w - 52)
        .attr("y", function (d, i) {
            return i * 20 + 9;
        })
        .attr("font-size", "11px")
        .attr("fill", "#737373")
        .text(function (d) {
            return d;
        });
        */
}