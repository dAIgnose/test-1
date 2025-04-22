// API Key for OpenWeatherMap or IQAir
const API_KEY = 'YOUR_API_KEY';  // Replace with your own API key
let userLocation = { lat: 0, lon: 0 };

// Detect user location
navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
    userLocation.lat = position.coords.latitude;
    userLocation.lon = position.coords.longitude;
    fetchAQI(userLocation.lat, userLocation.lon);
}

function error() {
    alert("Unable to retrieve your location.");
}

// Fetch AQI Data from OpenWeatherMap or IQAir
function fetchAQI(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const aqi = data.list[0].main.aqi;
            updateAQI(aqi);
        })
        .catch(error => {
            console.error("Error fetching AQI data:", error);
            alert("Error fetching AQI data.");
        });
}

// Update AQI Visualization
function updateAQI(aqi) {
    const aqiStatus = document.getElementById('aqi-status');
    const aqiSuggestion = document.getElementById('aqi-suggestion');
    const aqiValue = document.getElementById('aqi-value');
    const aqiGauge = document.getElementById('aqi-gauge');
    
    let suggestion = '';
    let color = '';
    let strokeDasharray = '';

    // Assign suggestions and colors based on AQI
    switch (aqi) {
        case 1:
            color = '#00e400'; // Good
            suggestion = "Air quality is good. No need for precautions.";
            strokeDasharray = "0 251";  // 0% of the circle
            break;
        case 2:
            color = '#ffff00'; // Moderate
            suggestion = "Air quality is moderate. Sensitive people may experience mild effects.";
            strokeDasharray = "50 251";  // 20% of the circle
            break;
        case 3:
            color = '#ff7e00'; // Unhealthy for sensitive groups
            suggestion = "Air quality is unhealthy for sensitive groups. Children and elderly should take precautions.";
            strokeDasharray = "100 251";  // 40% of the circle
            break;
        case 4:
            color = '#ff0000'; // Unhealthy
            suggestion = "Air quality is unhealthy. Everyone may begin to experience health effects.";
            strokeDasharray = "150 251";  // 60% of the circle
            break;
        case 5:
            color = '#8b0000'; // Very Unhealthy
            suggestion = "Air quality is very unhealthy. People should avoid all outdoor activities.";
            strokeDasharray = "200 251";  // 80% of the circle
            break;
        default:
            color = '#000000';
            suggestion = "AQI data unavailable.";
            strokeDasharray = "0 251";  // Default to no fill
    }

    // Set AQI value and gauge color
    aqiValue.textContent = aqi;
    aqiGauge.style.borderColor = color;
    aqiGauge.style.background = `conic-gradient(${color} ${strokeDasharray})`;

    // Display suggestion
    aqiStatus.innerHTML = `AQI: ${aqi}`;
    aqiSuggestion.innerHTML = suggestion;
}
