//Init function is called when the page loads 
function init() {
    let selector = d3.select("#selDataset");
    //Read the samples.json file and populate the selector
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        //Set page to the first value of the select
        let defaultVal = selector.node().value;
        buildPage(defaultVal);
    });
}

//Function that is called when the user selects a different value in the select
function optionChanged(newSample) {
    buildPage(newSample);
}

//Main builder function that will read the data from samples.json and build the page based on the sampleID selected
function buildPage(sampleId) {
    d3.json("samples.json").then((data) => {
        wfreq = handleMetadata(data.metadata, sampleId);
        handleSample(data.samples, sampleId, wfreq);
    });
}

//Function to get the data and call the buildcharts function
function handleSample(samples, sampleId, wfreq) {
    //Filter out the data based on the sampleId
    let sampleArray = samples.filter(sampleObj => sampleObj.id == sampleId);
    let sampleResult = sampleArray[0];
    buildCharts(sampleResult, wfreq);
}

//Handle the metadata and build the panel
function handleMetadata(metadata, sampleId) {
    //Filter out the data based on the sampleId
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sampleId);
    let result = resultArray[0];
    buildPanel(result);

    return result.wfreq;
}

//Function to populate the metadata panel
function buildPanel(result) {
    let panel = d3.select("#sample-metadata");
    //Clear the panel first
    panel.html("");
    panel.append("h6").text("ID:" + result.id);
    panel.append("h6").text("ETHNICITY:" + result.ethnicity);
    panel.append("h6").text("GENDER:" + result.gender);
    panel.append("h6").text("AGE:" + result.age);
    panel.append("h6").text("LOCATION:" + result.location);
    panel.append("h6").text("BBTYPE:" + result.bbtype);
    panel.append("h6").text("WFREQ:" + result.wfreq);
}

//Function to build out the bubble plot
function buildBubblePlot(otu_ids, sample_values, otu_labels) {
    //Plot the bubble chart
    let trace_bubble = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
            size: sample_values,
            color: otu_ids
        },
        text: otu_labels
    };
    let data_bubble = [trace_bubble];

    let layout_bubble = {
        title: '',
        xaxis: {
            "title": "OTU ID"
        },
        showlegend: false
    };
    Plotly.newPlot("bubble", data_bubble, layout_bubble);
}

//Function to build out the bar chart
function buildBarChart(otu_ids, sample_values, otu_labels) {
    //Get the results in descending order and only take the top 10 entries
    let otu_ids_top = otu_ids.slice(0, 10).reverse();
    let sample_values_top = sample_values.slice(0, 10).reverse();
    let otu_labels_top = otu_labels.slice(0, 10).reverse();
    //Append the OTU string to the beginning of the out_id
    let otu_ids_top_display = otu_ids_top.map(otu_id => "OTU " + otu_id);

    //Set the orientation to horizontal
    let trace = {
        x: sample_values_top,
        y: otu_ids_top_display,
        orientation: "h",
        text: otu_labels_top,
        type: "bar"
    };
    let data = [trace];
    Plotly.newPlot("bar", data);
}

//Function to build out the Gauge
function buildGaugePlot(wfreq) {
    let trace1 = {
        type: 'scatter',
        x: [0], y: [0],
        marker: { size: 14, color: '850000' },
        showlegend: false,
        name: 'Frequency',
        text: wfreq,
        hoverinfo: 'text+name'
    };
    let trace2 = {
        "values": [
            50 / 9,
            50 / 9,
            50 / 9,
            50 / 9,
            50 / 9,
            50 / 9,
            50 / 9,
            50 / 9,
            50 / 9,
            50
        ],
        rotation: 90,
        text: [
            "8-9",
            "7-8",
            "6-7",
            "5-6",
            "4-5",
            "3-4",
            "2-3",
            "1-2",
            "0-1",
            ""
        ],
        textinfo: "text",
        textposition: "inside",
        marker: {
            colors: [
                "rgba(133, 180, 138, .5)",
                "rgba(138, 187, 143, .5)",
                "rgba(140, 191, 136, .5)",
                "rgba(186, 202, 145, .5)",
                "rgba(215, 226, 157, .5)",
                "rgba(229, 231, 181, .5)",
                "rgba(232, 229, 203, .5)",
                "rgba(242, 240, 229, .5)",
                "rgba(246, 242, 236, .5)",
                "rgba(255, 255, 255, 0)"
            ]
        },
        labels: [
            "8-9",
            "7-8",
            "6-7",
            "5-6",
            "4-5",
            "3-4",
            "2-3",
            "1-2",
            "0-1",
            ""
        ],
        hoverinfo: "label",
        hole: .5,
        type: "pie",
        showlegend: false
    };
    let data = [trace1, trace2];
    // Enter a speed between 0 and 180, multiply by 20 since we are dealing with 0-9 scale to get a max of 180
    let level = (wfreq * 20);
    // Trig to calc meter point
    let degrees = 180 - level;
    let radius = .5;
    let radians = degrees * Math.PI / 180;
    let x = radius * Math.cos(radians);
    let y = radius * Math.sin(radians);
    let path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.05 L 0.0 0.05 L ' : 'M -0.05 -0.0 L 0.05 0.0 L ';
    // Path: may have to change to create a better triangle
    let mainPath = path1,
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    let path = mainPath.concat(pathX, space, pathY, pathEnd);

    let layout = {
        shapes: [{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
        }],
        height: 500,
        width: 500,
        xaxis: {
            zeroline: false, showticklabels: false,
            showgrid: false, range: [-1, 1]
        },
        yaxis: {
            zeroline: false, showticklabels: false,
            showgrid: false, range: [-1, 1]
        }
    };
    Plotly.newPlot('gauge', data, layout);
}

function buildCharts(sampleResult, wfreq) {
    //Get the needed datapoints from the sampleResult object
    let otu_labels = sampleResult.otu_labels;
    let otu_ids = sampleResult.otu_ids;
    let sample_values = sampleResult.sample_values;

    buildBarChart(otu_ids, sample_values, otu_labels);

    buildBubblePlot(otu_ids, sample_values, otu_labels);

    buildGaugePlot(wfreq);
}

init();