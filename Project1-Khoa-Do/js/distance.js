 //Load data
 dataCsv = d3.csv("../data/exoplanets-1.csv");

 //Margins and dimensions
 var margin = { top: 50, right: 10, bottom: 60, left: 80 },
     width = 925 - margin.left - margin.right,
     height = 400 - margin.top - margin.bottom;

 //Append svg object
 var svg = d3.select("#our_distance")
     .append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform",
         "translate(" + margin.left + "," + margin.top + ")");

 
 dataCsv.then(function (data) {

     //X axis
     var x = d3.scaleLinear()
         .domain([0, d3.max(data, function (d) { return +d.sy_dist })])
         .range([0, width]);
     svg.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x));

     //Y axis
     var y = d3.scaleLinear()
         .range([height, 0]);
     var yAxis = svg.append("g")

     //Title
     svg.append("text")
         .attr("x", width / 2)
         .attr("y", -5)
         .attr("text-anchor", "middle")
         .style("font-size", "16px")
         .text("Distribution of Exoplanets by Their Distance to Us");

    //X-Axis Label
    svg.append("text")
    .attr("transform", "translate(" + (width / 2) + " ," + (height + 50) + ")")
    .style("text-anchor", "middle")
    .text("Distance to System (pc)");

     //Y-Axis Label
     svg.append("text")
         .attr("transform", "rotate(-90)")
         .attr("x", -(height / 2))
         .attr("y", -50)
         .style("text-anchor", "middle")
         .text("Number of Exoplanets");


     // Histogram
     var histogram = d3.histogram()
         .value(function (d) { return d.sy_dist; })  
         .domain(x.domain())  
         .thresholds(x.ticks(20)); 

    
     var bins = histogram(data);

     // Y axis
     y.domain([0, d3.max(bins, function (d) { return d.length; })]);   
     yAxis.transition()
         .duration(1000)
         .call(d3.axisLeft(y));

    
     var u = svg.selectAll("rect")
         .data(bins)


     u.enter()
         .append("rect") 
         .merge(u) 
         .transition() 
         .duration(1)
         .attr("x", 1)
         .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
         .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
         .attr("height", function (d) { return height - y(d.length); })
         .style("fill", "#8dbc8a")

     
 });
