// COUNTER LOGIC 
// ------------------------------------------------------------------

const counters = document.querySelectorAll(".counters .num");
const counterBoxes = document.querySelectorAll(".counters");
const container = document.querySelector(".counter");

let activated = false;

window.addEventListener('scroll', () => {
    // Only run if the container exists
    if (!container) return;

    // check the page position
    if (pageYOffset > container.offsetTop - container.offsetHeight - 200
        && activated === false) {
        // Animate the counter boxes with a stagger
        counterBoxes.forEach((box, index) => {
            box.style.animation = `slide-up 500ms cubic-bezier(0.4, 0, 0.58, 1) both ${index * 0.05}s`;
        });

        // iterate through counters as counter for each item
        counters.forEach((counter) => {
            // set the initial value of counter as 0
            counter.innerText = 0;

            let count = 0;
            const updateCount = () => {

                //get the original value from the html
                const target = parseInt(counter.dataset.count);
                if (count < target) {
                    count++;

                    counter.innerText = count;

                    setTimeout(updateCount, 15);
                }
                else {
                    counter.innerText = target;
                }
                
            }
            updateCount();

            // set activated to true
            activated = true;
        });
    }
    else if (pageYOffset < container.offsetTop - container.offsetHeight - 500 || pageYOffset == 0 && activated == true){
        counterBoxes.forEach((box) => {
            box.style.animation = 'none';
        });
        counters.forEach(counter => {
            counter.innerText = 0;
            // reset animation
            counter.style.animation = 'none';
        });
        activated = false;
    }
});


// AUDIO CODE
// ------------------------------------------------------------------

/*let toggled = false
const checkBox = document.getElementById("audio-toggle");
const toggleText = document.getElementById("toggle-text");

checkBox.addEventListener('change', (event) => {
    if (event.target.checked) {
        toggleText.innerText = "ON";
    }
    else {
        toggleText.innerText = "OFF";
    }
})

// function toggleAudio() {
//     if (document.getElementById("audio-toggle").checked) {
//         alert("Autoplay is on");
//         localStorage.setItem("autoPlayVar", "true");
//     } else {
//         alert("Autoplay is off");
//         localStorage.setItem("autoPlayVar", "false");
//     }
// }

// function autoAudio(filename) {
//     if (localStorage.getItem("autoPlayVar") == "true") {
//         alert("Autoplay is on, playing audio");
//         playAudio(filename);
//     }
}
*/



// MAP CODE
// ------------------------------------------------------------------
var map = L.map('interactive-map', {
    center: [-37.7983, 144.9610],
    zoom: 16,
    minZoom: 16,
    maxZoom: 18
});



L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// all the locations
const campusBuildings = [
    {
        name: "Glynn Davis",
        coords: [-37.7970, 144.9626],
        link: "GlynDavis.html"
    },
    {
        name: "Law Building",
        coords: [-37.8023, 144.9600],
        link: "lawbuilding.html"
    },
    {
        name: "233 Bouverie",
        coords: [-37.8010, 144.9619],
        link: "233Bouverie (1).html"
    },
    {
        name: "Student Pavilion",
        coords: [-37.7987, 144.9634],
        link: "stops.html"
    },
    {
        name: "John Medley - East Tower",
        coords: [-37.79928, 144.9606],
        link: "mfjohnmedleymicro_east.html"
    },
    {
        name: "John Medley - West Tower",
        coords: [-37.79930, 144.96045],
        link: "mfjohnmedleymicro_west.html"
    },
    {
        name: "Western Edge BioSciences",
        coords: [-37.7964, 144.9586],
        link : "stops.html",
    }, 
    {
        name: 'Old Agriculutral Building',
        coords: [-37.79680,144.95863],
        link: "stops.html",
    }
]

// boundaries around the map

const southWest = L.latLng(-37.8050, 144.9500);
const northEast = L.latLng(-37.790, 144.9750);
const bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds);

map.on('drag', function () {
    map.panInsideBounds(bounds, { animate: false });
});


// Distance Calculator
let clickedBldgs = [];
let markers = [];
let polyline = null;

// render individual buildings on dropdown menu

const dropdownSection = document.querySelector(".interactive");

const startdropdown = document.createElement("select");
const enddropdown = document.createElement("select");

startdropdown.id = "start-building-select";
enddropdown.id = "end-building-select"

const startdefaultOption = document.createElement("option");
startdefaultOption.textContent = "Select Starting Point";
startdropdown.append(startdefaultOption);

const enddefaultOption = document.createElement("option");
enddefaultOption.textContent = "Select Ending Point";
enddropdown.append(enddefaultOption);

enddefaultOption.value, startdefaultOption.value = "";

// Insert the dropdown right after the label "Choose starting point:"
const startlabel = document.querySelector('label[for="bldg1"]');
if (startlabel) {
    startlabel.insertAdjacentElement('afterend', startdropdown);
} else {
    dropdownSection.appendChild(startdropdown);
}

const endlabel = document.querySelector('label[for="bldg2"]');
if (endlabel) {
    endlabel.insertAdjacentElement('afterend', enddropdown);
} else {
    dropdownSection.appendChild(enddropdown);
}

campusBuildings.forEach(bldg => {
    const startOption = document.createElement('option');
    startOption.innerText = bldg.name;
    startOption.value = bldg.name;
    startdropdown.append(startOption);

    const endOption = document.createElement('option');
    endOption.innerText = bldg.name;
    endOption.value = bldg.name;
    enddropdown.append(endOption);
});

// Add an event listener to handle when a building is selected
[startdropdown, enddropdown].forEach(dropdown => {
    dropdown.addEventListener('change', (event) => {
    const selectedName = event.target.value;
    const selectedBldg = campusBuildings.find(bldg => bldg.name === selectedName);
    
    if (selectedBldg) {
        // zoom the map to the selected building
        map.setView(selectedBldg.coords, 18);
        clickedBldgs.push(selectedBldg.name);

        console.log(clickedBldgs)
        // Open the popup for the selected building if the marker is saved
        if (selectedBldg.marker) {
            selectedBldg.marker.openPopup();
        }
    }
})});
    

//map each buildings as building and render it as popup marks
campusBuildings.forEach(bldg => { 
    bldg.marker = L.marker(bldg.coords)
        .addTo(map)
        .bindPopup(`
            <div style="text-align: center;">
            <h3 style="margin: 1rem;">${bldg.name}</h3>
            <a style="display: flex;  justify-content: center; gap: 10px; cursor: pointer; border-radius: 4px; border: none; padding: .5rem; background: #46C8F0;" target="_blank" href="./${bldg.link}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                <button style="cursor: pointer; border: none; background: none;">Visit</button>
            </a>

            </div>
        `);
})





    