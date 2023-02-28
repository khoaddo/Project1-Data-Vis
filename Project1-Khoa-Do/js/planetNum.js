console.log("Hello world");

dataCsv = d3.csv("../data/exoplanets-1.csv");

var margin = { top: 20, right: 30, bottom: 40, left: 170 },
    width = 1200 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


var svg = d3.select("#histogram2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


dataCsv.then(function (data) {

    //X-axis
    var x = d3.scaleLinear()
        .domain([0, 5000])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")

    //Y-axis
    var y = d3.scaleBand()
        .range([0, height])
        .domain(data.map(function (d) { return d.sy_pnum; }))
        .padding(.1);
    svg.append("g")
        .call(d3.axisLeft(y))

    //Bars
    bars = svg.selectAll("myRect")
            .data(d3.rollups(data, g => g.length, d => d.sy_pnum))
            .enter();

        bars.append("rect")
            .attr("x", x(0))
            .attr("y", function (d) { return y(d[0]); })
            .attr("width", function (d) { return x(d[1]); })
            .attr("height", y.bandwidth())
            .attr("fill", "#8dbc8a");
        //Bar values
        bars.append("text")
            .text(function (d) {
                return d[1];
            })
            .attr("y", function (d) {
                return y(d[0]) + 20;
            })
            .attr("x", 35)
            .style("text-anchor", "middle")
            .style("font-family", "Verdana")

        //Title
        svg.append("text")
        .attr("x", width / 2)
        .attr("y", -5)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Number of Exoplanets and Number of Planets");

         //X-Axis label
         bars.append("text")             
         .attr("transform",
               "translate(" + (width/2) + " ," + 
                             (height + margin.top + 20) + ")")
         .style("text-anchor", "middle")
         .text("Number of Exoplanets");
         
        //Y-Axis Label
        bars.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", margin.right - 80)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Number of Planets");


          })