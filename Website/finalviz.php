<?php 

      $session = $_GET["s1"]; 
      $varNames = file_get_contents("sessions/".$session."/varNames.csv");
      $varNameArray = explode(",", $varNames);
      $headers = json_encode($varNameArray);

?>

<html>

  <head>
    <meta charset="utf-8">

    <!-- Let browser know website is optimized for mobile -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" type="text/css" href="css/theme.css" >
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/css/materialize.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/css/materialize.min.css"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Import jQuery -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

    <!-- D3 Library for visualization of data -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
   
    <!-- Underscore Library for array functions -->
    <script type="text/javascript" src ="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore.js"></script>
    <script type="text/javascript" src ="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>

  </head>
  <body class="teal" style = "background-image: url(img/background.png)">


    <div class="container">
      <div class="center-align">
        <h4>Solutions</h4>
      </div class="center-align">
      <section class='center-align' id='chart'>
        <div id="sol_graph">
          <div class="col-sm-4" id="area1"></div>
        </div>
        <div ="var_graph">
          <div class="myGraph col-sm-2" id="area2"></div>
          <div class="myGraph col-sm-2" id="area3"></div>
          <div class="myGraph col-sm-2" id="area4"></div>
          <div class="myGraph col-sm-2" id="area5"></div>
          <div class="myGraph col-sm-2" id="area6"></div>
          <div class="myGraph col-sm-2" id="area7"></div>
          <div class="myGraph col-sm-2" id="area8"></div>
          <div class="myGraph col-sm-2" id="area9"></div>
          <div class="myGraph col-sm-2" id="area10"></div>
          <div class="myGraph col-sm-2" id="area11"></div> 
        </div>
      </section>
    </div>

    <script>

      var session = "<?php echo ($session) ?>"

      var headers = <?php echo ($headers) ?>

      var margin = {top: 25, right: 20, bottom: 25, left: 50},
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

      var data_array_cont = [];

      d3.csv("sessions/"+session+"/solutions.csv", function(error, data) {
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
          .attr('height', 2)
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
            match2.style('fill', 'red');
            match2.style('opacity', 1);

            var match3 = d3.select('#area3').select('#'+dataMatch);
            match3.style('fill', 'red');
            match3.style('opacity', 1);

            var match4 = d3.select('#area4').select('#'+dataMatch);
            match4.style('fill', 'red');
            match4.style('opacity', 1);

            var match5 = d3.select('#area5').select('#'+dataMatch);
            match5.style('fill', 'red');
            match5.style('opacity', 1);

            var match6 = d3.select('#area6').select('#'+dataMatch);
            match6.style('fill', 'red');
            match6.style('opacity', 1);

            var match7 = d3.select('#area7').select('#'+dataMatch);
            match7.style('fill', 'red');
            match7.style('opacity', 1);

            var match8 = d3.select('#area8').select('#'+dataMatch);
            match8.style('fill', 'red');
            match8.style('opacity', 1);

            var match9 = d3.select('#area9').select('#'+dataMatch);
            match9.style('fill', 'red');
            match9.style('opacity', 1);

            var match10 = d3.select('#area10').select('#'+dataMatch);
            match10.style('fill', 'red');
            match10.style('opacity', 1);

            var match11 = d3.select('#area11').select('#'+dataMatch);
            match11.style('fill', 'red');
            match11.style('opacity', 1);
          }

        }, false);

        document.querySelector('#area1').addEventListener('mouseout', function(e) {

          var dataMatch = e.target.id;

          if (dataMatch != '') {

            var match2 = d3.select('#area2').select('#'+dataMatch);
            match2.transition().delay(50).style('opacity', 0);
            match2.style('fill', 'black');

            var match3 = d3.select('#area3').select('#'+dataMatch);
            match3.transition().delay(50).style('opacity', 0).transition();
            match3.style('fill', 'black');

            var match4 = d3.select('#area4').select('#'+dataMatch);
            match4.transition().delay(50).style('opacity', 0);
            match4.style('fill', 'black');

            var match5 = d3.select('#area5').select('#'+dataMatch);
            match5.transition().delay(50).style('opacity', 0);
            match5.style('fill', 'black');

            var match6 = d3.select('#area6').select('#'+dataMatch);
            match6.transition().delay(50).style('opacity', 0);
            match6.style('fill', 'black');

            var match7 = d3.select('#area7').select('#'+dataMatch);
            match7.transition().delay(50).style('opacity', 0);
            match7.style('fill', 'black');

            var match8 = d3.select('#area8').select('#'+dataMatch);
            match8.transition().delay(50).style('opacity', 0);
            match8.style('fill', 'black');

            var match9 = d3.select('#area9').select('#'+dataMatch);
            match9.transition().delay(50).style('opacity', 0);
            match9.style('fill', 'black');

            var match10 = d3.select('#area10').select('#'+dataMatch);
            match10.transition().delay(50).style('opacity', 0);
            match10.style('fill', 'black');

            var match11 = d3.select('#area11').select('#'+dataMatch);
            match11.transition().delay(50).style('opacity', 0);
            match11.style('fill', 'black');
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
          .attr('height', 2)
          .attr('x', 10)
          .attr('y', function(d) {
            console.log(d);
            console.log(y(d));
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
          });
        }
      });

      var allHTMLTags = new Array();

      function getElementByClass(theClass, visi) {

      //Create Array of All HTML Tags
      var allHTMLTags=document.getElementsByTagName('*');

      //Loop through all tags using a for loop
      for (i=0; i<allHTMLTags.length; i++) {

      //Get all tags with the specified class name.
      if (allHTMLTags[i].className==theClass) {

      //Place any code you want to apply to all
      //elements with the class specified.

      allHTMLTags[i].style.opacity=visi;

          }
        }
      }


      function changeButton(el) {
        if ( el.innerHTML === "Show All Data" ) {
          el.innerHTML = "Hide All Data";
          getElementByClass('sol_data',1);
          getElementByClass('var_data',1);
        }
        else {
          el.innerHTML = "Show All Data";
          getElementByClass('sol_data',0);
          getElementByClass('var_data',0);
        }
      }

    </script>
    <div class="row" style="position: absolute; left: 25%; right: 20%; bottom: 7%">Scroll you mouse along the Objective Function bar to see solutions and their corresponding variable values.</div>
    <div class="row">
      <a style="position: absolute; left: 20%; right: 20%; bottom: 5%" class="waves-effect waves-light btn" onclick="changeButton(this)">Show All Data</a>
    </div>
  </body>
</html>