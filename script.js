function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Pad numbers with leading zeros
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;

    setTimeTheme(now.getHours());
}

// Set theme based on time
function setTimeTheme(hour) {
    const body = document.body;
    body.classList.remove('morning', 'afternoon', 'evening', 'night');
    if (hour >= 6 && hour < 12) {
        body.classList.add('morning');
    } else if (hour >= 12 && hour < 17) {
        body.classList.add('afternoon');
    } else if (hour >= 17 && hour < 20) {
        body.classList.add('evening');
    } else {
        body.classList.add('night');
    }
}

// Set theme based on location
function setLocationTheme(city) {
    const body = document.body;
    body.classList.remove('paris', 'newyork', 'tokyo', 'default-location');

    // Add your city/landmark themes here
    if (city.toLowerCase().includes("paris")) {
        body.classList.add('paris');
    } else if (city.toLowerCase().includes("new york")) {
        body.classList.add('newyork');
    } else if (city.toLowerCase().includes("tokyo")) {
        body.classList.add('tokyo');
    } else {
        body.classList.add('default-location');
    }
}

// Try to get user's city using Geolocation and a simple API
function fetchCityFromCoords(lat, lon) {
    // This uses the OpenStreetMap Nominatim API (no key needed for demo/small usage)
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
            const city = data.address.city || data.address.town || data.address.village || data.address.state || "Unknown";
            setLocationTheme(city);
        })
        .catch(() => {
            setLocationTheme("Unknown");
        });
}

function getLocationAndSetTheme() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                // Success
                fetchCityFromCoords(position.coords.latitude, position.coords.longitude);
            },
            function(error) {
                // Denied or error
                setLocationTheme("Unknown");
            }
        );
    } else {
        setLocationTheme("Unknown");
    }
}

setInterval(updateClock, 1000);
updateClock();
getLocationAndSetTheme();
