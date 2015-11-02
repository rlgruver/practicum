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

(function() {

  var svg = d3.select("#area1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data1 = [];

  d3.csv("data.csv", function(error, data) {
    if (error) throw error;

    for (key in data) {
      data1.push(data[key].obj_func);
    };

    data.forEach(function(d) {
      d.data1 = +d.obj_func;
    });

    y.domain(d3.extent(data, function(d) { return d.data1; }));

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("x", 10)
      .attr("y", 220)
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .text("x1");

    svg.append("rect")
      .attr("x", 10)
      .attr("y", 0)
      .attr("rx", 20)
      .attr("ry", 20)
      .attr("width", 20)
      .attr("height", 200)
      .attr("stroke", "steelblue")
      .attr("fill", "none");

    svg.append('g') 
      .attr('class', 'sol_data')      
      .attr('width', width)
      .attr('height', height)
      .selectAll('rect').data(data1)
      .enter().append('rect')
      .style('fill', "#000")
      .style('opacity', 0)
      .attr('width', 20)
      .attr('height', 3)
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
          .style('opacity', 0)
      })

  });

})();

(function() {

  var svg = d3.select("#area2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data2 = [];

  d3.csv("data.csv", function(error, data) {
    if (error) throw error;

    for (key in data) {
      data2.push(data[key].x1);
    };

    data.forEach(function(d) {
      d.data2 = +d.x1;
    });

    y.domain(d3.extent(data, function(d) { return d.data2; }));

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("x", 10)
      .attr("y", 220)
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .text("x1");

    svg.append("rect")
      .attr("x", 10)
      .attr("y", 0)
      .attr("rx", 20)
      .attr("ry", 20)
      .attr("width", 20)
      .attr("height", 200)
      .attr("stroke", "steelblue")
      .attr("fill", "none");

    svg.append('g') 
      .attr('class', 'sol_data')      
      .attr('width', width)
      .attr('height', height)
      .selectAll('rect').data(data2)
      .enter().append('rect')
      .style('fill', "#000")
      .style('opacity', 0)
      .attr('width', 20)
      .attr('height', 3)
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
          .style('opacity', 0)
      })

  });

})();

(function() {

  var svg = d3.select("#area3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data3 = [];

  d3.csv("data.csv", function(error, data) {
    if (error) throw error;

    for (key in data) {
      data3.push(data[key].u1);
    };

    data.forEach(function(d) {
      d.data3 = +d.u1;
    });

    y.domain(d3.extent(data, function(d) { return d.data3; }));

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("x", 10)
      .attr("y", 220)
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .text("u1");

    svg.append("rect")
      .attr("x", 10)
      .attr("y", 0)
      .attr("rx", 20)
      .attr("ry", 20)
      .attr("width", 20)
      .attr("height", 200)
      .attr("stroke", "steelblue")
      .attr("fill", "none");


    svg.append('g')
      .attr('class', 'sol_data')       
      .attr('width', width)
      .attr('height', height)
      .selectAll('rect').data(data3)
      .enter().append('rect')
      .style('fill', "#000")
      .style('opacity', 0)
      .attr('width', 20)
      .attr('height', 3)
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
          .style('opacity', 0)
      })
  });

})();

(function() {

  var svg = d3.select("#area4").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data4 = [];

  d3.csv("data.csv", function(error, data) {
    if (error) throw error;

    for (key in data) {
      data4.push(data[key].u2);
    };

    data.forEach(function(d) {
      d.data4 = +d.u2;
    });

    y.domain(d3.extent(data, function(d) { return d.data4; }));

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("x", 10)
      .attr("y", 220)
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .text("u2");

    svg.append("rect")
      .attr("x", 10)
      .attr("y", 0)
      .attr("rx", 20)
      .attr("ry", 20)
      .attr("width", 20)
      .attr("height", 200)
      .attr("stroke", "steelblue")
      .attr("fill", "none");

    svg.append('g')
      .attr('class', 'sol_data')       
      .attr('width', width)
      .attr('height', height)
      .selectAll('rect').data(data4)
      .enter().append('rect')
      .style('fill', "#000")
      .style('opacity', 0)
      .attr('width', 20)
      .attr('height', 3)
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
          .style('opacity', 0)
      })
  });

})();

/*svg.selectAll('sol_data')
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
          .style('opacity', 0)
      })*/