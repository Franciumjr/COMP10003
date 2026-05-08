var map = L.map('interactive-map').setView([-37.7979, 144.9634], 16);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


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
        coords: [ -37.8010, 144.9619],
        link: "233Bouverie (1).html"
    },
]

campusBuildings.forEach(bldg => {
    L.marker(bldg.coords)
    .addTo(map)
    .bindPopup(`<a href = "./${bldg.link}"><button>${bldg.name}</button></a>`)
})