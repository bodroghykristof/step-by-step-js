function linearSearch(haystack, needle) {
    return -1;
}

function binarySearch(haystack, needle) {
    return -1;
}

function getAverageSteps(maxNum, searchType, tries=100) {
    let haystack = Array.from(Array(maxNum).keys());
    let totalSteps = 0;
    for (let i=0; i < tries; i++) {
        let needle = Math.floor(Math.random() * maxNum) + 1;
        if (searchType === "LINEAR")
            totalSteps += linearSearch(haystack, needle);
        else if (searchType === "BINARY")
            totalSteps += binarySearch(haystack, needle);
    }
    return totalSteps / tries;
}

function plotter(datasets, title, axisLabels, axisScales) {
    let ctx = document.getElementById('stepChart');
    ctx.parentNode.style.maxWidth = '800px';
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: datasets,
        },
        options: {
            title: {
                text: title,
                display: true,
                fontSize: 24,
            },
            scales: {
                xAxes: [{
                    type: axisScales.x,
                    scaleLabel: {
                        display: true,
                        labelString: axisLabels.x,
                    },
                    ticks: {
                        maxTicksLimit: 12,
                        callback: function(tick, index, ticks) {
                            return tick.toLocaleString();
                        }
                    }
                }],
                yAxes: [{
                    type: axisScales.y,
                    scaleLabel: {
                        display: true,
                        labelString: axisLabels.y,
                    }
                }]
            },
        }
    });
}

function stepByStep(points) {
    let avgStepsLinear = Array();
    let avgStepsBinary = Array();
    for (let i = 0; i < points; i++) {
        let x = 10**(i + 1);
        avgStepsLinear.push({x: x, y: getAverageSteps(x, "LINEAR")});
        avgStepsBinary.push({x: x, y: getAverageSteps(x, "BINARY")});
    }

    let results = document.getElementById("results");
    for (let i = 0; i < points; i++) {
        const tr = document.createElement("tr");
        const td0 = document.createElement("td");
        td0.textContent = avgStepsLinear[i].x;
        tr.appendChild(td0);
        const td1 = document.createElement("td");
        td1.textContent = avgStepsLinear[i].y;
        tr.appendChild(td1);
        const td2 = document.createElement("td");
        td2.textContent = avgStepsBinary[i].y;
        tr.appendChild(td2);
        results.appendChild(tr);
    }

    plotter([{
                label: 'Linear search',
                data: avgStepsLinear,
                fill: false,
                borderColor: 'red',
            },
            {
                label: 'Binary search',
                data: avgStepsBinary,
                fill: false,
                borderColor: 'green',
            }],
            'Average steps in a guessing game',
        {x: 'Size of the numbers range', y: 'Average steps needed'},
        {x: 'linear', y: 'linear'})  // use 'linear' or 'logarithmic'
}

stepByStep(5);
