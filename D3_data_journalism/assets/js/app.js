// @TODO: YOUR CODE HERE! Carter Alvarez D3 Challenge app.js
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper and append it to fit with our width and height
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Import Data using D3
d3.csv("assets/data/data.csv").then(function(stateData) {

    //Sort the data
    stateData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });

    //Scale Function
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(stateData, d => d.poverty)+2])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([3, d3.max(stateData, d => d.healthcare)+2])
      .range([height, 0]);

    //Axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //Apply the axis to our chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    //Creat the circles for the chart with text
    var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("g")
    .attr("transform", function(d){return `translate(${xLinearScale(d.poverty)},${yLinearScale(d.healthcare)})`});

    var circles = circlesGroup.append("circle")
    .attr("r", "10")
    .classed("stateCircle", true);

    circlesGroup.append("text")
    .classed("stateText",true)
    .attr("dy",".3em")
    .text(d=>d.abbr);

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("class", "aText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "aText")
      .text("In Poverty (%)");
  }).catch(function(error) {
    console.log(error);
  });