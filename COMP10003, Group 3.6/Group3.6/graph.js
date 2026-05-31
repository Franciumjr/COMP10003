const canvas = document.getElementById('myChart');
const ctx = canvas.getContext('2d');
const scores = JSON.parse(canvas.getAttribute('data-scores') || '[7, 8, 8, 6, 8]');


const myChart = new Chart(ctx, {
    type: 'radar', 
    data: {
        
        labels: ['Environment', 'Accessiblity', 'Interior', 'Functionality', 'Facilities'], 
        datasets: [{
            label: "Score",
            data: scores, // The actual scores
            backgroundColor: 'rgba(163, 228, 247, 0.5)', // Fill color (semi-transparent)
            borderColor: 'rgb(70,200,240)', // Line color
            pointBackgroundColor: 'rgb(0, 0, 0, 0)', // Data point dot color
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
                suggestedMin: 0, 
                suggestedMax: 10, 
                ticks: {
                    stepSize: 2
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