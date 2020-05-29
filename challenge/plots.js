function init() {
    let selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
    })
}

function optionChanged(newSample) {
    buildMetadata(newSample);
}

function buildMetadata(sampleId) {
    d3.json("samples.json").then((data) => {
        wfreq = handleMetadata(data.metadata, sampleId);
        console.log("buildMetadata");
        handleSample(data.samples, sampleId, wfreq);
    });
}

function handleSample(samples, sampleId, wfreq) {
    console.log("handleSample");
    let sampleArray = samples.filter(sampleObj => sampleObj.id == sampleId);
    let sampleResult = sampleArray[0];
    buildCharts(sampleResult, wfreq);
}

function handleMetadata(metadata, sampleId) {
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sampleId);
    let result = resultArray[0];
    buildPanel(result);

    return result.wfreq;
}

function buildPanel(result) {
    let panel = d3.select("#sample-metadata");

    panel.html("");
    panel.append("h6").text("ID:" + result.id);
    panel.append("h6").text("ETHNICITY:" + result.ethnicity);
    panel.append("h6").text("GENDER:" + result.gender);
    panel.append("h6").text("AGE:" + result.age);
    panel.append("h6").text("LOCATION:" + result.location);
    panel.append("h6").text("BBTYPE:" + result.bbtype);
    panel.append("h6").text("WFREQ:" + result.wfreq);
}

function buildGauge(wfreq) {
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
                "rgba(14, 127, 0, .5)",
                "rgba(110, 154, 22, .5)",
                "rgba(170, 202, 42, .5)",
                "rgba(202, 209, 95, .5)",
                "rgba(210, 206, 145, .5)",
                "rgba(232, 226, 202, .5)",
                "rgba(232, 226, 202, .5)",
                "rgba(232, 226, 202, .5)",
                "rgba(232, 226, 202, .5)",
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
    }
    let data = [trace1, trace2];

    // Enter a speed between 0 and 180
    var level = (wfreq*20);

    // Trig to calc meter point
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.05 L 0.0 0.05 L ' : 'M -0.05 -0.0 L 0.05 0.0 L ';
    // Path: may have to change to create a better triangle
    var mainPath = path1,
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX, space, pathY, pathEnd);
    console.log(path);

    var layout = {
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

function sortSamples(a, b) {
    // Enter a speed between 0 and 180
    var level = 90;

    // Trig to calc meter point
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
    var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
    // Path: may have to change to create a better triangle
    var mainPath = path1,
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    var data = [{
        type: 'scatter',
        x: [0], y: [0],
        marker: { size: 14, color: '850000' },
        showlegend: false,
        name: 'speed',
        text: level,
        hoverinfo: 'text+name'
    },
    {
        values: [1, 1, 1, 1, 4],
        rotation: 90,
        text: ['Excellent', 'Average', 'Warning', 'Poor', ''],
        textinfo: 'text',
        textposition: 'inside',
        marker: {
            colors: ['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                'rgba(249, 168, 37, .5)', 'rgba(183,28,28, .5)',
                'rgba(0, 0, 0, 0.5)']
        },
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
    }];

    var layout = {
        shapes: [{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
        }],
        height: 400,
        width: 400,
        xaxis: {
            zeroline: false, showticklabels: false,
            showgrid: false, range: [-1, 1]
        },
        yaxis: {
            zeroline: false, showticklabels: false,
            showgrid: false, range: [-1, 1]
        }
    };

    Plotly.newPlot('myDiv', data, layout);

}

function buildCharts(sampleResult, wfreq) {
    console.log("buildCharts");
    //sampleResult = sampleResult.sort(sortSamples);
    //Look back to sort object
    let otu_labels = sampleResult.otu_labels;
    let otu_labels_top = otu_labels.slice(0, 10).reverse();
    let otu_ids = sampleResult.otu_ids;
    let sample_values = sampleResult.sample_values;

    let otu_ids_top = otu_ids.slice(0, 10).reverse();
    let otu_ids_display = otu_ids_top.map(otu_id => "OTU " + otu_id);
    let sample_values_top = sample_values.slice(0, 10).reverse();

    let trace = {
        x: sample_values_top,
        y: otu_ids_display,
        orientation: "h",
        text: otu_labels_top,
        type: "bar"
    };

    console.log(trace);
    let data = [trace];
    Plotly.newPlot("bar", data);

    //Do bubble chart
    var trace_bubble = {
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

    var layout_bubble = {
        title: '',
        xaxis: {
            "title": "OTU ID"
        },
        showlegend: false
    };
    Plotly.newPlot("bubble", data_bubble, layout_bubble);

    buildGauge(wfreq);
}

init();