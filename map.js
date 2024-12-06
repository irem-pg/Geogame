// Access the current script element
const scriptElement = document.currentScript;

// Retrieve the attributes
const lat1 = scriptElement.getAttribute('lat')
const lon1 = scriptElement.getAttribute('lon')
const z= scriptElement.getAttribute('zoom')

const lat= Number(lat1)
const lon= Number(lon1)

// Initialize the map
const map = L.map('map', {
    zoom: z, // Increase the zoom level for a better view
    center: [lat,lon], // Initial center (roughly the center of Turkey)
    scrollWheelZoom: false, // Disable scroll zoom
    doubleClickZoom: false, // Disable double-click zoom
    touchZoom: false, // Disable touch zoom
    boxZoom: false // Disable box zoom
});

// Add a mute tile layer (Carto Light)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// Define borders using GeoJSON (replace with actual GeoJSON data)
const turkey = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [26.0, 36.0],
                        [26.0, 42.1],
                        [45.0, 42.1],
                        [45.0, 36.0],
                        [26.0, 36.0]
                    ]
                ]
            }
        }
    ]
};

const germany = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [5.87, 47.27], // Bottom-left (Southwest)
                        [5.87, 55.06], // Top-left (Northwest)
                        [15.03, 55.06], // Top-right (Northeast)
                        [15.03, 47.27], // Bottom-right (Southeast)
                        [5.87, 47.27]  // Close polygon
                    ]
                ]
            }
        }
    ]
};

const britain = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [-125.0, 24.3963],
                        [-125.0, 49.3847],
                        [-66.9346, 49.3847],
                        [-66.9346, 24.3963],
                        [-125.0, 24.3963]
                    ]
                ]
            }
        }
    ]
};

// Get the country attribute
const country = scriptElement.getAttribute('country');

// Map country names to GeoJSON objects
const geoJSONMapping = {
    "turkey": turkey,
    "germany": germany,
    "britain": britain
};

// Set GeoJSON based on the country
const GeoJSON = geoJSONMapping[country.toLowerCase()] || null;


// Add the GeoJSON layer for Turkey to the map with a style
const Layer = L.geoJSON(GeoJSON, {
    style: function (feature) {
        return {
            color: 'blue', // Border color
            weight: 2, // Border width
            opacity: 1, // Border opacity
            fillColor: 'rgba(0, 0, 255, 0.3)', // Fill color with opacity
            fillOpacity: 0.3 // Fill opacity
        };
    }
}).addTo(map);

// Log bounds to check if the map is fitting the GeoJSON properly
Layer.on('add', function() {
    const bounds = Layer.getBounds();
    console.log('GeoJSON Bounds:', bounds); // Log the bounds
    map.fitBounds(Layer.getBounds());
}); 