var margin = {top: 25, right: 20, bottom: 25, left: 60},
    width = 200 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

var y = d3.scale.linear()
  .range([height, 0]);

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

var tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('padding', '0 10px')
      .style('background', 'white')
      .style('opacity', 0);

//(function() {

var data1 = [],
    data2 = [],
    data3 = [],
    data4 = [],
    data5 = [],
    data6 = [],
    data7 = [],
    data8 = [],
    data9 = [],
    data10 = [],
    data11 = [];


var headers = ['obj_func','x1','u1','u2'];

var data_array_cont = [];

d3.csv("data.csv", function(error, data) {
  if (error) throw error;

  for (key in data) {
    data1.push(data[key].data1);
    data2.push(data[key].data2);
    data3.push(data[key].data3);
    data4.push(data[key].data4);
    data5.push(data[key].data5);
    data6.push(data[key].data6);
    data7.push(data[key].data7);
    data8.push(data[key].data8);
    data9.push(data[key].data9);
    data10.push(data[key].data10);
    data11.push(data[key].data11);
  };

  data_array_cont = [data2,data3,data4,data5,data6,data7,data8,data9,data10,data11];

  var graph = d3.select("#area1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  y.domain([d3.min(data1), d3.max(data1)]);

  graph.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
      .attr("x", 10)
      .attr("y", 220)
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .text(headers[0]);

  graph.append("rect")
    .attr("x", 10)
    .attr("y", 0)
    .attr("rx", 20)
    .attr("ry", 20)
    .attr("width", 20)
    .attr("height", 200)
    .attr("stroke", "steelblue")
    .attr("fill", "none");

  graph.append('g')       
    .attr('width', width)
    .attr('height', height)
    .selectAll('rect').data(data1)
    .enter().append('rect')
    .attr('class', 'sol_data')
    .attr('id', function(d,i) {
      return 'marker'+i;
    })
    .style('fill', '#000')
    .style('opacity', 0)
    .attr('width', 20)
    .attr('height', 1)
    .attr('x', 10)
    .attr('y', function(d) {
      return y(d);
    })

    .on('mouseover', function(d) {

      tooltip.transition()
        .style('opacity', .9)

      tooltip.html(d)
        .style('left', (d3.event.pageX - 35) + 'px')
        .style('top', (d3.event.pageY - 30) + 'px')

      d3.select(this)
        .style('opacity', 1)
    })

    .on('mouseout', function(d) {
      d3.select(this)
        .transition()
        .delay(50)
        .style('opacity', 0)
    })

  document.querySelector('#area1').addEventListener('mouseover', function(e) {

    var dataMatch = e.target.id;

    if (dataMatch != '') {

      var match2 = d3.select('#area2').select('#'+dataMatch);
      match2.style('opacity', 1);

      var match3 = d3.select('#area3').select('#'+dataMatch);
      match3.style('opacity', 1);

      var match4 = d3.select('#area4').select('#'+dataMatch);
      match4.style('opacity', 1);

      var match5 = d3.select('#area5').select('#'+dataMatch);
      match5.style('opacity', 1);

      var match6 = d3.select('#area6').select('#'+dataMatch);
      match6.style('opacity', 1);

      var match7 = d3.select('#area7').select('#'+dataMatch);
      match7.style('opacity', 1);

      var match8 = d3.select('#area8').select('#'+dataMatch);
      match8.style('opacity', 1);

      var match9 = d3.select('#area9').select('#'+dataMatch);
      match9.style('opacity', 1);

      var match10 = d3.select('#area10').select('#'+dataMatch);
      match10.style('opacity', 1);

      var match11 = d3.select('#area11').select('#'+dataMatch);
      match11.style('opacity', 1);
    }

  }, false);

  document.querySelector('#area1').addEventListener('mouseout', function(e) {

    var dataMatch = e.target.id;

    if (dataMatch != '') {

      var match2 = d3.select('#area2').select('#'+dataMatch);
      match2.transition().delay(50).style('opacity', 0);

      var match3 = d3.select('#area3').select('#'+dataMatch);
      match3.transition().delay(50).style('opacity', 0).transition();

      var match4 = d3.select('#area4').select('#'+dataMatch);
      match4.transition().delay(50).style('opacity', 0);

      var match5 = d3.select('#area5').select('#'+dataMatch);
      match5.transition().delay(50).style('opacity', 0);

      var match6 = d3.select('#area6').select('#'+dataMatch);
      match6.transition().delay(50).style('opacity', 0);

      var match7 = d3.select('#area7').select('#'+dataMatch);
      match7.transition().delay(50).style('opacity', 0);

      var match8 = d3.select('#area8').select('#'+dataMatch);
      match8.transition().delay(50).style('opacity', 0);

      var match9 = d3.select('#area9').select('#'+dataMatch);
      match9.transition().delay(50).style('opacity', 0);

      var match10 = d3.select('#area10').select('#'+dataMatch);
      match10.transition().delay(50).style('opacity', 0);

      var match11 = d3.select('#area11').select('#'+dataMatch);
      match11.transition().delay(50).style('opacity', 0);
    }

  }, false);

  for (var i = 0; i<headers.length-1; i++) {

    var graph = d3.select('#area'+(i+2))
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  y.domain([d3.min(data_array_cont[i]), d3.max(data_array_cont[i])]); 

  graph.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
      .attr("x", 10)
      .attr("y", 220)
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .text(headers[i+1]);

  graph.append("rect")
    .attr("x", 10)
    .attr("y", 0)
    .attr("rx", 20)
    .attr("ry", 20)
    .attr("width", 20)
    .attr("height", 200)
    .attr("stroke", "steelblue")
    .attr("fill", "none");

  graph.append('g')
    .attr('class', 'targets')       
    .attr('width', width)
    .attr('height', height)
    .selectAll('rect').data(data_array_cont[i])
    .enter().append('rect')
    .attr('class', 'var_data')
    .attr('id', function(d,i) {
      return 'marker'+i;
    })
    .style('fill', '#000')
    .style('opacity', 0)
    .attr('width', 20)
    .attr('height', 1)
    .attr('x', 10)
    .attr('y', function(d) {
      return y(d);
    })

    .on('mouseover', function(d) {

      tooltip.transition()
        .style('opacity', .9)

      tooltip.html(d)
        .style('left', (d3.event.pageX - 35) + 'px')
        .style('top', (d3.event.pageY - 30) + 'px')

      d3.select(this)
        .style('opacity', 1)
    })

    .on('mouseout', function(d) {
      d3.select(this)
        .transition()
        .delay(50)
        .style('opacity', 0)
    })

  }

});