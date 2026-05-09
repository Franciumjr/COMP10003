var map = L.map('interactive-map', {
    center: [-37.7983, 144.9610],
    zoom: 16,
    minZoom: 16,
    maxZoom: 19
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
        name: "Law Buiding",
        coords: [-37.8023, 144.9600],
        link: "lawbuilding.html"
    },
    {
        name: "233 Bouverie",
        coords: [-37.8010, 144.9619],
        link: "233Bouverie (1).html"
    },
    {
        name: "Student Pavillion",
        coords: [-37.7987, 144.9634],
        link: "spmicrowave402.html"
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



campusBuildings.forEach(bldg => {
    L.marker(bldg.coords)
        .addTo(map)
        .bindPopup(`<a target="_blank" href = "./${bldg.link}"><button style = "padding: 2px">${bldg.name}</button></a>`)
})