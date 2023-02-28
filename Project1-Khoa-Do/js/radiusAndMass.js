console.log("Hello world");

dataCsv = d3.csv("../data/exoplanets-1.csv");

var margin = { top: 20, right: 30, bottom: 40, left: 170 },
    width = 1200 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


var svg = d3.select("#radiusAndMass")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


dataCsv.then(function (data) {

    //X axis
    const x = d3.scaleLinear()
    .domain([0, 50000])
    .range([ 0, width ]);
    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

    //Y axis
    const y = d3.scaleLinear()
    .domain([0, 40])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
        //.attr("cx", function (d) { return x(d.pl_rade); } )
        //.attr("cy", function (d) { return y(d.pl_bmasse); } )
        .attr("cx", function (d) { return x(d.pl_bmasse); } )
        .attr("cy", function (d) { return y(d.pl_rade); } )
        .attr("r", 1.5)
        .style("fill", "#8dbc8a")
    
    //Title
    svg.append("text")
    .attr("x", width / 2)
    .attr("y", -5)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Exoplanet Radius vs. Mass");

     //X Axis label
     svg.append("text")
     .attr("transform", "translate(" + (width / 2) + " ," + (height + 30) + ")")
     .style("text-anchor", "middle")
     .text("Planet Mass [Earth Mass]");

    //Y Axis Label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.right - 100)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Planet Radius [Earth Radius]");

          })