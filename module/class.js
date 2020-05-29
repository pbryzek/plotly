// Plotly.newPlot("plotArea", [{x: [1, 2, 3], y: [10, 20, 30]}]);

var trace = {
    x: ["burrito", "pizza", "chicken"],
    y: [10, 18, 5],
    type: "bar"
 };
 Plotly.newPlot("plotArea", [trace]);
 

 function basicDropDownExample() {
    let selector = d3.selec("#text-color-selector");
    let colorOptions = ["blue", "red"];
    colorOptions.forEach((color) => {
        selector.append("option").text(color);
    });
}

// Storage Event
// change is fire dfor input, select, and textarea
// when they hit enter or tab, it is officially changed to fire it.

function basicOptionHandlerChange() {
    var dropDownMenuID = this.id;
    var selectedOption = this.value;
    d3.selectOption("#body").style("#background-color", selectedOption);
}
d3.select("#text-color-selector").on("change", basicOptionHandlerChange);

function runBasicLoadJSONDemo(){
    const url = "https://api.spacexdata.com/v2/launchpads"
    d3.json(url).then(
        function(data) {
            console.log(data);
            console.log("Was I 1st or 2nd?");
        }
    );

    d3.json("data.json").then(
        function (data) {
            console.log("Or was I???");
        }
    );

    console.log("How about me guys?");
}

async function Promises() {
    aPromise = new Promise((resolve, reject) => {
        setTimeout( function(){
            resolve("Success!");
        }, 2000);
    });

    aPromise.then(function(successParam){
        console.log("Yay! " + successParam);
    });

    aPromise.catch(function(failParam){
        console.log("This won't likely happen. ");
    });
    console.log("First statement");

    await aPromise;

    console.log("Going last");
}

function createAirBNBDataAreaDropdown(){
    d3.json("data.json").then(
        function(data) {
            let dropdown = d3.select(".container").append("select").attr("id", "filterByArea");
            data.id.forEach((area) => dropdown.append("option").text(area));
        }
    );
    console.log("How about me?");
}

var keyList = [];
function createBubblePlotParamDropdowns() {
    d3.json("data.json").then(
        function(data) {
            keyList = [];
            Object.keys(data.data[0]).forEach((key) => keyList.push(key));

            let row = d3.select(".container").append("div");
            row.classed("row", true);
            row.append("div").classed("col-md-2", true).text("xAxis");
            row.append("div").classed("col-md-2", true).text("yAxis");
            row.append("div").classed("col-md-2", true).text("size");
            row.append("div").classed("col-md-2", true).text("color");

            let xdropdown = d3.select(".container").append("select").attr("id", "xaxis");
            keyList.forEach((key) => xdropdown.append("option").text(key));
            let yDropDown = d3.select(".container").append("select").attr("id", "yaxis");
            keyList.forEach((key) => yDropDown.append("option").text(key));
            let sizedropdown = d3.select(".container").append("select").attr("id", "size");
            keyList.forEach((key) => sizedropdown.append("option").text(key));
            let colordropdown = d3.select(".container").append("select").attr("id", "color");
            keyList.forEach((key) => colordropdown.append("option").text(key));


        }
    );
}

let plotOptions = {};
function plotOptionsChanged() {
    plotOptions[this.id] = this.value;
    console.log(plotOptions);
}
function registerThoseDropdownHandlers() {
    d3.selectAll("select").on("change", plotOptionsChanged);
}

function buildABubbleplt() {
    d3.json("data.json").then(function (data){
        // === also checks the data type and value
        let dataCopy = data.data.filter(x => x.id == plotOptions["filterByArea"]);
        console.log(dataCopy);

        // Get X,Y
        let xData = dataCopy[0][plotOptions["xaxis"]];
        let yData = dataCopy[0][plotOptions["yaxis"]];
        let size = dataCopy[0][plotOptions["size"]];
        let color = dataCopy[0][plotOptions["color"]];

        buildBacteriaCountBubblePlot(xData, yData, size, color);
    });
}

let firstStart = true;
function buildBacteriaCountBubblePlot(x,y,size,color){
    let marker_size = size.map((s) => s/10);
    let marker_colors = color;

    var bubbleTrace = {
        x:x,
        y:y,
        mode: 'markers',
        marker:{
            size: marker_size,
            color: marker_colors,
            colorscale:"Earth"
        }
    };

    if (firstStart){
        firstStart = false;
    } else {
        //Clear the chart before plotting if it has already been plotted
        Plotly.deleteTraces('bubble', 0);
    }
    console.log(x);
    console.log(y);
    console.log(color);

    Plotly.plot("bubble", [bubbleTrace]);
}

function init() {
    data = [{
        x: [],
        y: []
    }];
    Plotly.newPlot("plot", data);
}
function updatePage() {
    var dropdown = d3.selectAll("#selectOption").node();
    var dataset = dropdown.property("value");

    var x = [];
    var y = [];

    if (dataset === 'usa'){
        x = [1,2,3,4,5];
        y = [1,2,4,8,16];
    } else if (dataset === 'uk'){
        x = [10,20,30,40,50];
        y = [1,10,100,1000,10000];
    } else if (dataset === 'canada'){

    }
    Plotly.restyle("plot", "x", [x]);
    Plotly.restyle("plot", "y", [y]);
}

d3.selectAll("body").on("change", updatePage);

IntersectionObserver();