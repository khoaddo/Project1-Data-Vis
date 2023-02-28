console.log("Hello world");

//Determines habitability of exoplanets
function hab(data) {
    const starTypes = ["A", "F", "G", "K", "M"];
    let habArray = [];
    let temp = [0,0];
    const starMap = new Map();
    starMap.set('A-inner', 8.5);
    starMap.set('A-outer', 12.5);
    starMap.set('F-inner', 1.5);
    starMap.set('F-outer', 2.2);
    starMap.set('G-inner', 0.95);
    starMap.set('G-outer', 1.4);
    starMap.set('K-inner', 0.38);
    starMap.set('K-outer', 0.56);
    starMap.set('M-inner', 0.08);
    starMap.set('M-outer', 0.12);
    data.forEach(planet => {
        temp[0] = planet.st_spectype[0];
        if (starTypes.includes(temp[0])) {
            temp[1] = planet.pl_orbsmax;
            if(temp[1] > starMap.get(temp[0] + "-inner") && (temp[1] < starMap.get(temp[0] + "-outer"))) {
                habArray.push({"starType": temp[0], "habitability": "Hab"});
            }
            else {
                habArray.push({"starType": temp[0], "habitability": "Inhab"});
            }
        }
    });
    return habArray;
}

function updateVis() {

    dataCsv = d3.csv("../data/exoplanets-1.csv");

    //Dimensions and margins
    var margin = { top: 50, right: 10, bottom: 60, left: 200 },
        width = 925 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    //Append svg object
    var svg = d3.select("#habitability")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");




    dataCsv.then(function (data) {

        //X axis
        var x = d3.scaleLinear()
            .domain([0, 700])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")

        //Y axis
        var y = d3.scaleBand()
            .range([0, height])
            .domain(["A-Hab", "A-Inhab", "F-Hab", "F-Inhab", "G-Hab", "G-Inhab", "K-Hab", "K-Inhab", "M-Hab", "M-Inhab"])
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y))

        //Title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -5)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Number of Inhabitable vs. Habitable");

        
        //X-axis Label
        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + 50) + ")")
            .style("text-anchor", "middle")
            .text("Number of Exoplanets");

        //Y-Axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", margin.right - 100)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Inhabitable and Habitable Star Types");



        //Bars
        var bars = svg.selectAll("myRect")
            .data(d3.rollups(hab(data), g => g.length, d => d.starType, d => d.habitability))
            .enter();
        bars.append("rect")
            .attr("x", x(0))
            .attr("y", function (d) { 
                let inhab = d[1][0];
                let hab = d[1][1];
                bars.append("rect")
                    .attr("x", x(0))
                    .attr("y", y(d[0] + "-" + hab[0]))
                    .attr("width", function (d) { return x(hab[1]); })
                    .attr("height", y.bandwidth())
                    .attr("fill", "#8dbc8a");
                return y(d[0] + "-" + inhab[0]);
            })
            .attr("width", function (d) { return x(d[1][0][1]); })
            .attr("height", y.bandwidth())
            .attr("fill", "#FAA0A0");


    });
}

updateVis();