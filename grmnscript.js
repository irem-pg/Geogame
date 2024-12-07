document.addEventListener('DOMContentLoaded', () => {
    const cities = [
        { name: "Baden-Württemberg", coords: [47.8613, 11.3505] },
        { name: "Bayern", coords: [47.9904, 13.4977] },
        { name: "Berlin", coords: [51.7200, 15.4050] },
        { name: "Brandenburg", coords: [51.6113, 15.3013] },
        { name: "Bremen", coords: [52.2793, 10.8017] },
        { name: "Hamburg", coords: [52.7511, 11.9937] },
        { name: "Hessen", coords: [49.3109, 10.6821] },
        { name: "Niedersachsen", coords: [51.3065, 11.7317] },
        { name: "Mecklenburg-Vorpommern", coords: [52.8294, 14.1067] },
        { name: "Nordrhein-Westfalen", coords: [50.3657, 8.7919] },
        { name: "Rheinland-Pfalz", coords: [49.3372, 9.1050] },
        { name: "Saarland", coords: [48.6000, 9.0000] },
        { name: "sachsen", coords: [50.5397, 14.3731] },
        { name: "sachsen-Anhalt", coords: [51.1465, 13.5881] },
        { name: "Schleswig-Holstein", coords: [53.5233, 12.1228] },
        { name: "Thüringen", coords: [50.1791, 13.0299] }
    ];

    let totalcities = cities.length;
    let FoundCities = [];
    let score = 5;
    document.getElementById("score").textContent = score;

    // Function to pick a random city for the color section
    function getRandomCity() {
        const randomIndex = Math.floor(Math.random() * cities.length);
        const chosenCity = cities[randomIndex];
        cities.splice(randomIndex, 1);
        return chosenCity;
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

    // Score rearrangement functions
    function add() {
        score++;
        document.getElementById("score").textContent = score;
    }

    function sub() {
        score--;
        document.getElementById("score").textContent = score;
    }

    // Function for the endgame message
    function ending() {
        toggleBox('box2'); // Open the end game box
    
        let endTitle = '';
        let endText = '';
    
        if (FoundCities.length > (totalcities / 2)) {
            endTitle = 'Congratulations!';
            endText = `You have found ${FoundCities.length}/${totalcities} cities.`;
        } else if (FoundCities.length > 4) {
            endTitle = 'Better luck next time!';
            endText = `You have found ${FoundCities.length}/${totalcities} cities.`;
        } else {
            endTitle = ':(';
            endText = `You have found ${FoundCities.length}/${totalcities} cities.`;
        }

        document.getElementById('endTitle').textContent = endTitle;
        document.getElementById('endText').textContent = endText;
    }

    // Setup the page once the window is fully loaded
    window.onload = function () {
        // Randomly assign city names to the color sections and buttons
        const colorSections = document.querySelectorAll('.color-section');
        colorSections.forEach(section => {
            const city = getRandomCity();
            section.querySelector('p').textContent = city.name;
            section.querySelector('p').setAttribute('data-coords', JSON.stringify(city.coords));
        });

        // Handle dragging and dropping events for both desktop and mobile
        const mapContainer = document.getElementById('map');

        // Store the currently dragged city element
        let activeCity = null;

        // Handle touchstart (for mobile)
        const cityElements = document.querySelectorAll('.color-section p');

        cityElements.forEach(cityElement => {
            cityElement.addEventListener('touchstart', (e) => {
                e.preventDefault();
                activeCity = cityElement;
                cityElement.setAttribute('data-dragged', 'true');

                // Store the city data
                cityElement.setAttribute('data-coordinates', JSON.stringify({
                    name: cityElement.textContent,
                    coords: JSON.parse(cityElement.getAttribute('data-coords'))
                }));

                // Set the city to absolute position and prevent other interactions
                activeCity.style.position = 'absolute';
                activeCity.style.pointerEvents = 'none'; // Disable interactions with other elements
            });

            // Handle touchmove (for mobile)
            cityElement.addEventListener('touchmove', (e) => {
                if (activeCity) {
                    const touch = e.touches[0];
                    const x = touch.pageX - mapContainer.offsetLeft;
                    const y = touch.pageY - mapContainer.offsetTop;

                    // Update the city element position as the user moves their finger
                    activeCity.style.left = `${x - activeCity.offsetWidth / 2}px`;
                    activeCity.style.top = `${y - activeCity.offsetHeight / 2}px`;
                }
            });

            // Handle touchend (for mobile)
            cityElement.addEventListener('touchend', (e) => {
                if (activeCity) {
                    const touch = e.changedTouches[0];

                    // Get the drop position on the map
                    const x = touch.pageX - mapContainer.offsetLeft;
                    const y = touch.pageY - mapContainer.offsetTop;

                    // Convert touch position to map's lat/lng
                    const latlng = map.containerPointToLatLng([x, y]);
                    const lat = latlng.lat;
                    const lng = latlng.lng;

                    // Get the city data
                    const cityData = JSON.parse(activeCity.getAttribute('data-coordinates'));
                    const cityName = cityData.name;
                    const cityCoords = cityData.coords;

                    // Handle the drop logic (calculate distance and update score)
                    const distance = calculateDistance(cityCoords, [lat, lng]);
                    const threshold = 100; // Set threshold distance (in km)

                    console.log('City:', cityName, 'Coords:', cityCoords, 'Dropped At:', [lat, lng], 'Distance:', distance);

                    if (distance <= threshold) {
                        // Correct drop, increase score
                        FoundCities.push(cityName);
                        const a = cityCoords[0] + 0.8;
                        const b = cityCoords[1] - 2;
                        const markCoords = [a, b];

                        // Place marker on the map
                        L.marker(markCoords).addTo(map)
                            .bindPopup(cityName)
                            .openPopup();

                        add();
                    } else {
                        // Incorrect drop, decrease score
                        sub();
                    }

                    // Reset the city element's position
                    activeCity.style.position = '';
                    activeCity.style.pointerEvents = ''; // Enable interaction again
                    activeCity = null;

                    // Check if all sections are 'Almost done'
                    const allSectionsAlmostDone = Array.from(document.querySelectorAll('.color-section')).every(section => {
                        return section.querySelector('p').textContent === 'Almost done!';
                    });

                    if (allSectionsAlmostDone || score <= 0) {
                        if (!document.getElementById('box2').classList.contains('active')) {
                            ending();
                        }
                    }
                }
            });
        });
    };
});
