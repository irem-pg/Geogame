document.addEventListener('DOMContentLoaded', () => {
    const cities = [
        { name: "Alabama", coords: [32.271, -85.199] },
        { name: "Alaska", coords: [58.2187, -148.503] },
        { name: "Arizona", coords: [32.823, -111.451] },
        { name: "Arkansas", coords: [34.371, -90.573] },
        { name: "California", coords: [36.343, -120.734] },
        { name: "Colorado", coords: [39.441, -104.539] },
        { name: "Connecticut", coords: [41.229, -72.008] },
        { name: "Delaware", coords: [38.058, -75.573] },
        { name: "Florida", coords: [27.533, -80.543] },
        { name: "Georgia", coords: [33.371, -82.451] },
        { name: "Hawaii", coords: [21.211, -156.212] },
        { name: "Idaho", coords: [43.363, -115.456] },
        { name: "Illinois", coords: [40.046, -89.195] },
        { name: "Indiana", coords: [39.697, -86.221] },
        { name: "Iowa", coords: [41.322, -93.607] },
        { name: "Kansas", coords: [38.556, -95.199] },
        { name: "Kentucky", coords: [37.723, -85.146] },
        { name: "Louisiana", coords: [31.898, -91.180] },
        { name: "Maine", coords: [44.267, -69.015] },
        { name: "Maryland", coords: [39.319, -75.255] },
        { name: "Massachusetts", coords: [42.278, -70.008] },
        { name: "Michigan", coords: [43.042, -84.801] },
        { name: "Minnesota", coords: [45.298, -93.547] },
        { name: "Mississippi", coords: [32.626, -89.461] },
        { name: "Missouri", coords: [38.246, -91.455] },
        { name: "Montana", coords: [46.361, -110.469] },
        { name: "Nebraska", coords: [41.403, -98.543] },
        { name: "Nevada", coords: [38.104, -115.434] },
        { name: "New Hampshire", coords: [43.509, -71.149] },
        { name: "New Jersey", coords: [40.184, -74.254] },
        { name: "New Mexico", coords: [34.904, -105.239] },
        { name: "New York", coords: [42.293, -74.459] },
        { name: "North Carolina", coords: [35.451, -79.076] },
        { name: "North Dakota", coords: [46.411, -99.276] },
        { name: "Ohio", coords: [40.377, -82.968] },
        { name: "Oklahoma", coords: [35.672, -97.541] },
        { name: "Oregon", coords: [44.291, -118.434] },
        { name: "Pennsylvania", coords: [40.263, -77.597] },
        { name: "Rhode Island", coords: [41.268, -71.007] },
        { name: "South Carolina", coords: [33.669, -80.055] },
        { name: "South Dakota", coords: [44.251, -99.276] },
        { name: "Tennessee", coords: [35.508, -86.354] },
        { name: "Texas", coords: [31.980, -98.468] },
        { name: "Utah", coords: [40.438, -111.434] },
        { name: "Vermont", coords: [44.039, -72.459] },
        { name: "Virginia", coords: [37.402, -78.631] },
        { name: "Washington", coords: [47.411, -120.385] },
        { name: "West Virginia", coords: [38.473, -80.625] },
        { name: "Wisconsin", coords: [43.379, -88.543] },
        { name: "Wyoming", coords: [42.320, -106.451] }
    ];

    let totalcities= cities.length
    let FoundCities= []
    let score = 10
    document.getElementById("score").textContent = score

    // Function to pick a random city for the color section
    function getRandomCity() {
        const randomIndex = Math.floor(Math.random() * cities.length); // Get a random index
        const chosenCity = cities[randomIndex]; // Get the city at that index
        cities.splice(randomIndex, 1); // Remove the city from the list
        return chosenCity; // Return the chosen city
    }

    // Helper function to calculate distance between two coordinates
    function calculateDistance(coords1, coords2) {
        const [lat1, lon1] = coords1;
        const [lat2, lon2] = coords2;
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in kilometers
    }

    //score rearrangment functions
    function add() {
        score++;
        document.getElementById("score").textContent = score
    }

    function sub() {
        score--;
        document.getElementById("score").textContent = score
    }

    //Function for the endgame message
    function ending() {
        toggleBox('box2'); // Open the end game box
    
        let endTitle = '';
        let endText = '';
    
        if (FoundCities.length > (totalcities/2)) { // More than half the cities found
            endTitle = 'Congratulations!';
            endText = `You have found ${FoundCities.length}/${totalcities} cities.`;
        } else if (FoundCities.length > 4) { // Between 25% and 50% of cities found
            endTitle = 'Better luck next time!';
            endText = `You have found ${FoundCities.length}/${totalcities} cities.`;
        } else { // Less than 25% of cities found
            endTitle = ':(';
            endText = `You have found ${FoundCities.length}/${totalcities} cities.`;
        }

        // Log the variables to check if they are set properly
        console.log('endTitle:', endTitle);
        console.log('endText:', endText);
    
        // Set the content for the endTitle and endText spans
        document.getElementById('endTitle').textContent = endTitle;
        document.getElementById('endText').textContent = endText;
    }

    // Setup the page once the window is fully loaded
    window.onload = function () {
        // Randomly assign city names to the color sections and buttons
        const colorSections = document.querySelectorAll('.color-section');
        colorSections.forEach(section => {
            const city = getRandomCity(); // Get a random city
            section.querySelector('p').textContent = city.name; // Set the city name in the section
            section.querySelector('p').setAttribute('data-coords', JSON.stringify(city.coords)); // Store coords
        });

        // Make the city names draggable
        const cityElements = document.querySelectorAll('.color-section p');
        cityElements.forEach(cityElement => {
            cityElement.setAttribute('draggable', 'true'); // Make the city name draggable

            cityElement.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text', e.target.textContent); // Store the city name
                e.dataTransfer.setData('coords', e.target.getAttribute('data-coords')); // Store the coords
                e.target.setAttribute('data-dragged', 'true'); // Mark this city element as being dragged
            });
        });

        // Enable map container to accept drops
        const mapContainer = document.getElementById('map');

        mapContainer.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow the drop to happen
        });

        mapContainer.addEventListener('drop', (e) => {
            e.preventDefault();
        
            // Get the city name and coords from the drag event
            const cityName = e.dataTransfer.getData('text');
            const cityCoords = JSON.parse(e.dataTransfer.getData('coords'));
        
            // Get the mouse position relative to the map container
            const x = e.offsetX;
            const y = e.offsetY;
        
            // Convert screen coordinates to map's lat/lng
            const latlng = map.containerPointToLatLng([x, y]);
            const lat = latlng.lat;
            const lng = latlng.lng;
        
            // Calculate distance and give feedback
            const distance = calculateDistance(cityCoords, [lat, lng]);
            const threshold = 400;
        
            console.log(cityCoords, lat, lng, distance);
        
            const draggedCityElement = document.querySelector('[data-dragged="true"]');
            if (draggedCityElement) {
                const section = draggedCityElement.closest('.color-section');
        
                if (distance <= threshold) {
                    FoundCities.push(cityName);
        
                    const a = cityCoords[0] 
                    const b = cityCoords[1] -2
                    const markCoords = [a, b]
        
                    L.marker(markCoords).addTo(map)
                        .bindPopup(cityName)
                        .openPopup();
        
                    if (cities.length > 0) {
                        const newCity = getRandomCity();
                        section.querySelector('p').textContent = newCity.name;
                        section.querySelector('p').setAttribute('data-coords', JSON.stringify(newCity.coords));
                    } else {
                        section.querySelector('p').textContent = 'Almost done!';
                        section.querySelector('p').setAttribute('data-coords', JSON.stringify(null));
                    }
        
                    add();
                } else {
                    sub();
                }
        
                // Check if all sections are 'Almost done'
                const allSectionsAlmostDone = Array.from(document.querySelectorAll('.color-section')).every(section => {
                    return section.querySelector('p').textContent === 'Almost done!';
                });
        
                if (allSectionsAlmostDone || score <= 0) {
                    if (!document.getElementById('box2').classList.contains('active')) {
                        ending();
                    }
                }
        
                draggedCityElement.removeAttribute('data-dragged');
            }
        });
    };
});