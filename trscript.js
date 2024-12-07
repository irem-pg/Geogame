document.addEventListener('DOMContentLoaded', () => {
    const cities = [
        { name: "Adana", coords: [36.2, 37.3213] },
        { name: "Adıyaman", coords: [36.9648, 40.2786] },
        { name: "Afyonkarahisar", coords: [37.9507, 32.5567] },
        { name: "Ağrı", coords: [38.9191, 45.0503] },
        { name: "Aksaray", coords: [37.5687, 36.037] },
        { name: "Amasya", coords: [39.8539, 37.8336] },
        { name: "Ankara", coords: [39.12077, 34.85411] },
        { name: "Antalya", coords: [36.0969, 32.7133] },
        { name: "Ardahan", coords: [40.3087, 44.7022] },
        { name: "Artvin", coords: [40.3828, 43.8199] },
        { name: "Aydın", coords: [37.0444, 29.8452] },
        { name: "Balıkesir", coords: [38.8484, 29.8826] },
        { name: "Bartın", coords: [40.8358, 34.3374] },
        { name: "Batman", coords: [37.0812, 43.1351] },
        { name: "Bayburt", coords: [39.4589, 42.2267] },
        { name: "Bilecik", coords: [39.3431, 31.9793] },
        { name: "Bingöl", coords: [38.0848, 42.4983] },
        { name: "Bitlis", coords: [37.5931, 44.1234] },
        { name: "Bolu", coords: [39.936, 33.6066] },
        { name: "Burdur", coords: [36.9167, 32.2909] },
        { name: "Bursa", coords: [39.3828, 31.0664] },
        { name: "Çanakkale", coords: [39.3456, 28.4064] },
        { name: "Çankırı", coords: [39.8013, 35.6134] },
        { name: "Çorum", coords: [39.7489, 36.9535] },
        { name: "Denizli", coords: [36.9833, 31.0963] },
        { name: "Diyarbakır", coords: [37.1144, 42.2306] },
        { name: "Düzce", coords: [40.0438, 33.1565] },
        { name: "Edirne", coords: [40.8772, 28.5557] },
        { name: "Elazığ", coords: [37.8743, 41.2203] },
        { name: "Erzincan", coords: [38.946, 41.4912] },
        { name: "Erzurum", coords: [39.1, 43.2711] },
        { name: "Eskişehir", coords: [38.9767, 32.5206] },
        { name: "Gaziantep", coords: [36.2662, 39.3833] },
        { name: "Giresun", coords: [40.1171, 40.3895] },
        { name: "Gümüşhane", coords: [39.6602, 41.4705] },
        { name: "Hakkari", coords: [36.7736, 45.7408] },
        { name: "Hatay", coords: [35.4023, 38.1606] },
        { name: "Iğdır", coords: [39.122, 46.034] },
        { name: "Isparta", coords: [36.9618, 32.5567] },
        { name: "İstanbul", coords: [40.2082, 30.9784] },
        { name: "İzmir", coords: [37.6192, 29.1287] },
        { name: "Kahramanmaraş", coords: [36.773, 38.9375] },
        { name: "Karabük", coords: [40.4061, 34.6204] },
        { name: "Karaman", coords: [36.3815, 35.2157] },
        { name: "Kars", coords: [39.7988, 45.0938] },
        { name: "Kastamonu", coords: [40.5834, 35.7763] },
        { name: "Kayseri", coords: [37.9333, 37.4857] },
        { name: "Kilis", coords: [35.9181, 39.1133] },
        { name: "Kırıkkale", coords: [39.0468, 35.5153] },
        { name: "Kırklareli", coords: [40.9351, 29.2258] },
        { name: "Kırşehir", coords: [38.3451, 36.1607] },
        { name: "Kocaeli", coords: [40.0757, 31.9187] },
        { name: "Konya", coords: [37.0715, 34.4844] },
        { name: "Kütahya", coords: [38.6191, 31.9786] },
        { name: "Malatya", coords: [37.5552, 40.3095] },
        { name: "Manisa", coords: [37.6192, 29.1287] },
        { name: "Mardin", coords: [36.5154, 42.7327] },
        { name: "Mersin", coords: [36.0139, 36.6401] },
        { name: "Muğla", coords: [36.4144, 30.3665] },
        { name: "Muş", coords: [37.9361, 43.8632] },
        { name: "Nevşehir", coords: [37.8925, 36.685] },
        { name: "Niğde", coords: [37.1667, 36.6833] },
        { name: "Ordu", coords: [40.1833, 39.8833] },
        { name: "Osmaniye", coords: [36.4291, 38.2476] },
        { name: "Rize", coords: [40.2202, 42.5158] },
        { name: "Sakarya", coords: [40.0267, 32.4406] },
        { name: "Samsun", coords: [40.4867, 38.33] },
        { name: "Şanlıurfa", coords: [36.3561, 40.7947] },
        { name: "Siirt", coords: [37.1333, 43.9333] },
        { name: "Sinop", coords: [41.2104, 37.1505] },
        { name: "Sivas", coords: [38.9478, 39.0175] },
        { name: "Şırnak", coords: [36.7107, 44.4553] },
        { name: "Tekirdağ", coords: [40.1757, 29.5141] },
        { name: "Tokat", coords: [39.5111, 38.5539] },
        { name: "Trabzon", coords: [40.2019, 41.7205] },
        { name: "Tunceli", coords: [38.7574, 41.5494] },
        { name: "Uşak", coords: [37.8822, 31.4086] },
        { name: "Van", coords: [37.4955, 45.4164] },
        { name: "Yalova", coords: [39.8505, 31.2775] },
        { name: "Yozgat", coords: [39.0204, 36.8045] },
        { name: "Zonguldak", coords: [40.6542, 33.7984] }
    ];

    let totalcities= cities.length
    let FoundCities= []
    let score = 15
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
            endText = "You have found ${FoundCities.length}/${totalcities} cities.";
        } else if (FoundCities.length > 4) { // Between 25% and 50% of cities found
            endTitle = 'Better luck next time!';
            endText = "You have found ${FoundCities.length}/${totalcities} cities.";
        } else { // Less than 25% of cities found
            endTitle = ':(';
            endText = "You have found ${FoundCities.length}/${totalcities} cities.";
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
            const threshold = 100;
        
            console.log(cityCoords, lat, lng, distance);
        
            const draggedCityElement = document.querySelector('[data-dragged="true"]');
            if (draggedCityElement) {
                const section = draggedCityElement.closest('.color-section');
        
                if (distance <= threshold) {
                    FoundCities.push(cityName);
        
                    const a = cityCoords[0] + 0.8
                    const b = cityCoords[1] - 2
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