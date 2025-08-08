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

function setLocationTheme(city) {
    const body = document.body;
    const themeMsg = document.getElementById('themeMsg');
    const themes = [
        { name: 'paris', keywords: ['paris'], display: "Paris (Eiffel Tower)" },
        { name: 'newyork', keywords: ['new york', 'nyc'], display: "New York (Statue of Liberty)" },
        { name: 'tokyo', keywords: ['tokyo'], display: "Tokyo (Skytree)" },
        { name: 'london', keywords: ['london'], display: "London (Big Ben)" },
        { name: 'sydney', keywords: ['sydney'], display: "Sydney (Opera House)" },
        { name: 'mumbai', keywords: ['mumbai', 'bombay'], display: "Mumbai (Gateway of India)" },
        // Add more here!
    ];
    // Remove all possible location themes
    themes.forEach(theme => body.classList.remove(theme.name));
    body.classList.remove('default-location');

    let found = false;
    city = city.toLowerCase();
    for (const theme of themes) {
        if (theme.keywords.some(k => city.includes(k))) {
            body.classList.add(theme.name);
            if (themeMsg) themeMsg.textContent = `Location theme: ${theme.display}`;
            found = true;
            break;
        }
    }
    if (!found) {
        body.classList.add('default-location');
        if (themeMsg) themeMsg.textContent = `Location theme: Default`;
    }
}

function fetchCityFromCoords(lat, lon) {
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
                fetchCityFromCoords(position.coords.latitude, position.coords.longitude);
            },
            function(error) {
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
