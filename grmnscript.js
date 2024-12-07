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

    //score rearrangement functions
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

        // Make the city names draggable on desktop and mobile
        const cityElements = document.querySelectorAll('.color-section p');
        cityElements.forEach(cityElement => {
            cityElement.setAttribute('draggable', 'true'); // Make the city name draggable

            cityElement.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text', e.target.textContent); // Store the city name
                e.dataTransfer.setData('coords', e.target.getAttribute('data-coords')); // Store the coords
                e.target.setAttribute('data-dragged', 'true'); // Mark this city element as being dragged
            });

            // Handle touchstart (for mobile)
            cityElement.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                activeCity = cityElement;
                activeCity.setAttribute('data-dragged', 'true');
                activeCity.style.position = 'absolute';
                activeCity.style.pointerEvents = 'none'; // Prevent interaction with other elements

                // Store the offset of the touch within the element
                const rect = activeCity.getBoundingClientRect();
                activeCity.dataset.offsetX = touch.pageX - rect.left;
                activeCity.dataset.offsetY = touch.pageY - rect.top;
            });

            // Handle touchmove (for mobile)
            cityElement.addEventListener('touchmove', (e) => {
                if (activeCity) {
                    const touch = e.touches[0];
                    const offsetX = parseFloat(activeCity.dataset.offsetX);
                    const offsetY = parseFloat(activeCity.dataset.offsetY);

                    // Update the position of the element to follow the finger
                    activeCity.style.left = `${touch.pageX - offsetX}px`;
                    activeCity.style.top = `${touch.pageY - offsetY}px`;
                }
            });

            // Handle touchend (for mobile)
            cityElement.addEventListener('touchend', (e) => {
                if (activeCity) {
                    const touch = e.changedTouches[0];
                    const cityData = JSON.parse(activeCity.getAttribute('data-coordinates'));
                    const cityName = cityData.name;
                    const cityCoords = cityData.coords;

                    // Get the drop position on the map
                    const x = touch.pageX - mapContainer.offsetLeft;
                    const y = touch.pageY - mapContainer.offsetTop;

                    // Convert touch position to map's lat/lng
                    const latlng = map.containerPointToLatLng([x, y]);
                    const lat = latlng.lat;
                    const lng = latlng.lng;

                    // Handle the drop logic (score update, marker placement)
                    handleDrop(cityName, cityCoords, lat, lng);

                    // Reset the activeCity
                    activeCity.style.position = '';
                    activeCity.style.pointerEvents = ''; // Enable interaction again
                    activeCity = null;
                }
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

            // Handle drop logic
            handleDrop(e, cityName, cityCoords, lat, lng);
        });

        // Mobile touch drop handler
        mapContainer.addEventListener('touchend', (e) => {
            e.preventDefault();
            const touch = e.changedTouches[0];
            const x = touch.pageX - mapContainer.offsetLeft;
            const y = touch.pageY - mapContainer.offsetTop;

            const latlng = map.containerPointToLatLng([x, y]);
            const lat = latlng.lat;
            const lng = latlng.lng;

            handleDrop(e, cityName, cityCoords, lat, lng);
        });
    };

    // Handle drop logic for both touch and drag events
    function handleDrop(e, cityName, cityCoords, lat, lng) {
        const distance = calculateDistance(cityCoords, [lat, lng]);
        const threshold = 100;

        if (distance <= threshold) {
            FoundCities.push(cityName);

            const markCoords = [cityCoords[0] + 0.8, cityCoords[1] - 2];
            L.marker(markCoords).addTo(map)
                .bindPopup(cityName)
                .openPopup();

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
    }
});