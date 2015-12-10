var initialBox = [1e-2,3,0,2];

//var nextBox = [0.0099999999999999985,0.67166666666666663,0,1.3233333333333335];

var initXStart = +initialBox[0],
	initXEnd = +initialBox[1],
	initYStart = +initialBox[2],
	initYEnd = +initialBox[3];

/*var nextXStart = +nextBox[0],
	nextXEnd = +nextBox[1],
	nextYStart = +nextBox[2],
	nextYEnd = +nextBox[3];*/

var margin = {top: 30, right: 30, bottom: 40, left: 50};

var height = 390 - margin.top - margin.bottom,
	width = 560 - margin.left - margin.right;

var color = "#"+((1<<24)*Math.random()|0).toString(16);

var xScale = d3.scale.linear()
		.domain([initXStart, initXEnd])
		.range([0, width])

var yScale = d3.scale.linear()
	.domain([initYStart, initYEnd])
	.range([0, height])

var vScale = d3.scale.linear()
	.domain([initYStart, initYEnd])
	.range([height, 0])

var myChart = d3.select('#chart').append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom);

var myG = myChart.append('g')
.style('background', '#C9D7D6');

/*console.log("boxwidth: " + xScale(initXEnd - initXStart));
console.log("boxheight: " + yScale(initYEnd - initYStart));
console.log("boxXstart: " + xScale(initXStart));
console.log("boxYstart: " + yScale(initYStart));*/	

myG.append('rect')
	.attr('id', 'initBox')
	.style('fill', '#C61C6F')
	//.style('stroke', '#000')
	.attr('x', xScale(initXStart))
	.attr('y', yScale(initYStart))
	.attr('width', xScale(initXEnd - initXStart))
	.attr('height', yScale(initYEnd - initYStart))
	.attr('transform', 'translate(35, 10)');

/*myG.append('rect')
	.attr('id', 'nextBox')
	.style('fill', '#FFF')
	//.style('stroke', '#000')
	.attr('width', (xScale(nextXEnd) - xScale(nextXStart)))
	.attr('height', (vScale(nextYStart) - vScale(nextYEnd)))
	.attr('x', xScale(nextXStart))
	.attr('y', yScale(nextYStart))
	.attr('transform', 'translate(10, 0)');*/

d3.csv("rtviz.csv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
      d.xstart = +d.xstart;
      d.xend = +d.xend;
      d.ystart = +d.ystart;
      d.yend = +d.yend;

    });  

	var myDiv = myG.append('g')
		.selectAll('rect').data(data)
		.enter().append('rect')
		.attr('transform', 'translate(35, 10)')
		.style('fill', '#FFF')
		.attr('x', function(d) {
			//console.log("xstart: " + xScale(d.xstart));
			return xScale(d.xstart);
		})
		.attr('width', function(d) {
			/*console.log("x1: " + d.xstart);
			console.log("xStart: " + xScale(d.xstart));
			console.log("x2: " + d.xend);
			console.log("xEnd: " + xScale(d.xend));
			console.log("diff: " + (d.xend-d.xstart));
			console.log("width: " + (xScale(d.xend)-xScale(d.xstart)));*/
			return (xScale(d.xend) - xScale(d.xstart));
		})
		.attr('height', 0)
			/*console.log("y1: " + d.ystart);
			console.log("yStart: " + yScale(d.ystart));
			console.log("y2: " + d.yend);
			console.log("yEnd: " + yScale(d.yend));
			console.log("diff: " + (d.yend-d.ystart));
			console.log("height: " + (yScale(d.yend) - yScale(d.ystart)));*/
			//return yScale(d.yend) - yScale(d.ystart);
		//});
		//.attr(zIndex = 2);
		.attr('y', height)
			//console.log("ystart: " + vScale(d.ystart));
			//return yScale(d.ystart)
		//})

		myDiv.transition()
		.attr('height', function(d) {
			return yScale(d.yend - d.ystart);
		})
		.attr('y', function(d) {
			return yScale(d.ystart);
		})
		.delay(function(d,i) {
			return i * 500;
		})

	/*var mySVG = d3.select('svg')
		.selectAll('rect').data(data)
		.enter().append('rect')
		.attr('transform', 'translate(10, 0)')
		.style('fill', color)
		.attr('width', function(d) {
			return xScale(d.xend - d.xstart);
		})
		.attr('x', function(d) {
			return xScale(d.xstart);
		})
		.attr('height', 0)
		.attr('y', height)

	mySVG.transition()
		.attr('height', function(d) {
			return vScale(d.yend - d.ystart);
		})
		.attr('y', function(d) {
			return vScale(d.ystart);
		})
		.delay(function(d,i) {
			return i * 500;
		})*/

	var hAxis = d3.svg.axis()
		.scale(xScale)
		.orient('bottom')
		.ticks(15)

	var hGuide = d3.select('svg').append('g')
		hAxis(hGuide)

		hGuide.attr('transform', 'translate(30, 340)')
		hGuide.selectAll('path')
			.style({fill: 'none', stroke: "#000"})
		hGuide.selectAll('line')
			.style({stroke: "#000"})

	var vAxis = d3.svg.axis()
		.scale(vScale)
		.orient('left')
		.ticks(10)

	var vGuide = d3.select('svg').append('g')
		vAxis(vGuide)

		vGuide.attr('transform', 'translate(30, 10)')
		vGuide.selectAll('path')
			.style({fill: 'none', stroke: "#000"})
		vGuide.selectAll('line')
			.style({stroke: "#000"})
 });
