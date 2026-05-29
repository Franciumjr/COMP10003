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
        coords: [-37.7973, 144.9627],
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
        coords: [-37.79865, 144.9636],
        link: "studentpav.html"
    },
    {
        name: "John Medley - East Tower",
        coords: [-37.79929, 144.96088],
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
        link : "web.html",
    }, 
    {
        name: 'Old Agriculutral Building',
        coords: [-37.79680,144.95863],
        link: "oab.html",
    },
    {
        name: 'Kwong Lee Dow',
        coords: [-37.8040, 144.9608],
        link: "kwongleedow.html",
    }
]

// boundaries around the map

const southWest = L.latLng(-37.8065, 144.9500);
const northEast = L.latLng(-37.790, 144.9760);
const bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds);

map.on('drag', function () {
    map.panInsideBounds(bounds, { animate: false });
});



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

[startdropdown, enddropdown].forEach(dropdown => {
    dropdown.addEventListener('change', (event) => {
        const selectedName = event.target.value;
        const selectedBldg = campusBuildings.find(bldg => bldg.name === selectedName);

        if (selectedBldg) {
            map.setView(selectedBldg.coords, 18);

            campusBuildings.forEach(b => {
                if (b.marker) b.marker.setIcon(blueIcon);
            });

            const startBldg = campusBuildings.find(b => b.name === startdropdown.value);
            const endBldg = campusBuildings.find(b => b.name === enddropdown.value);
            if (startBldg?.marker) startBldg.marker.setIcon(redIcon);
            if (endBldg?.marker) endBldg.marker.setIcon(redIcon);

            if (selectedBldg.marker) selectedBldg.marker.openPopup();
        }
    });
});    
function createIcon(color) {
    return L.icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
}
const blueIcon = createIcon('blue');
const redIcon = createIcon('red');

//map each buildings as building and render it as popup marks
campusBuildings.forEach(bldg => { 
    bldg.marker = L.marker(bldg.coords, { icon: blueIcon })
        .addTo(map)
        .bindPopup(`
            <div style="text-align: center;">
            <h3 style="margin: 0.5rem 0 0.5rem 0; font-family: 'Fraunces', serif; font-weight: 400; font-size: 1.15rem; color: #000F46;">${bldg.name}</h3>
            <hr style="border: 0; border-top: 1px solid #ddd; margin: 0.5rem 0;" />
            <a style="display: flex; justify-content: center; align-items: center; gap: 8px; cursor: pointer; border-radius: 0px; border: none; padding: 0.5rem; background: #46C8F0;" target="_blank" href="./${bldg.link}">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                <button style="cursor: pointer; border: none; background: none; font-family: 'Source Sans 3', sans-serif; font-weight: bold; font-size: 0.95rem;">Visit</button>
            </a>
            </div>
        `);

    bldg.marker.on('click', () => {
        campusBuildings.forEach(b => {
            if (b.marker) b.marker.setIcon(blueIcon);
        });
        bldg.marker.setIcon(redIcon);
    });
});

// DISTANCE CALCULATOR
// ------------------------------------------------------------------

function toRad(deg) { return deg * Math.PI / 180; }

function haversineDistance(coords1, coords2) {
    const R = 6371000;
    const dLat = toRad(coords2[0] - coords1[0]);
    const dLon = toRad(coords2[1] - coords1[1]);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(coords1[0])) * Math.cos(toRad(coords2[0])) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatTime(seconds) {
    if (seconds < 60) return `${seconds}s`;
    return `${Math.round(seconds / 60)} min`;
}

function calculateAndDisplay() {
    const startName = startdropdown.value;
    const endName   = enddropdown.value;

    const startBldg = campusBuildings.find(b => b.name === startName);
    const endBldg   = campusBuildings.find(b => b.name === endName);

    const resultBox = document.getElementById("distance-result");

    if (!startBldg || !endBldg) {
        resultBox.innerHTML = "<p>Please select both a start and end location.</p>";
        return;
    }
    if (startBldg.name === endBldg.name) {
        resultBox.innerHTML = "<p>Please select two different locations.</p>";
        return;
    }

    const dist   = haversineDistance(startBldg.coords, endBldg.coords);
    const distM  = Math.round(dist);
    const distKm = (dist / 1000).toFixed(2);

    const slowMin = formatTime(Math.round(dist / 0.9));
    const avgMin  = formatTime(Math.round(dist / 1.4));
    const fastMin = formatTime(Math.round(dist / 2.0));

    resultBox.innerHTML = `
        <h3><strong>Distance:</strong> ${distM}m (${distKm}km)</h3>
        <h4><strong>Route:</strong> ${startBldg.name} → ${endBldg.name}</h4>
        <table>
            <tr><th>Pace</th><th>Speed</th><th></th><th>Time</th></tr>
            <tr><td>Leisurely</td><td>3.2 km/h</td><td>→</td><td>${slowMin}</td></tr>
            <tr><td>Average</td><td>5.0 km/h</td><td>→</td><td>${avgMin}</td></tr>
            <tr><td>Brisk</td><td>7.2 km/h</td><td>→</td><td>${fastMin}</td></tr>
        </table>
    `;

    map.fitBounds([startBldg.coords, endBldg.coords], { padding: [40, 40] });
}

document.querySelector('.btncalc').addEventListener('click', calculateAndDisplay);





    