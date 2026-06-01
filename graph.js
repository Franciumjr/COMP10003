const canvas = document.getElementById('myChart');
// get the info from html
const ctx = canvas.getContext('2d');

// this is passed as props into the html file so that we can make changes directly from html
const scores = JSON.parse(canvas.getAttribute('data-scores'));


const myChart = new Chart(ctx, {
    type: 'radar',
    data: {

        labels: ['Environment', 'Accessiblity', 'Interior', 'Functionality', 'Facilities'],
        datasets: [{
            label: "Score",
            data: scores, // The actual scores
            backgroundColor: 'rgba(163, 228, 247, 0.5)',
            borderColor: 'rgb(70,200,240)',
            pointBackgroundColor: 'rgb(0, 0, 0, 0)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(70,200,240)'
        }]
    },
    options: {
        responsive: true,
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                suggestedMin: 0, // min value
                suggestedMax: 10, // max value
                ticks: {
                    stepSize: 2 // the increment of the graph
                }
            }
        },
        elements: {
            line: {
                borderWidth: 2
            }
        }
    }
});