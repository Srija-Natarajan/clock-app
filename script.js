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

    // Call setTheme to update the background based on the hour
    setTheme(now.getHours());
}

function setTheme(hour) {
    const body = document.body;
    // Remove all possible theme classes first
    body.classList.remove('morning', 'afternoon', 'evening', 'night');

    // Add a class based on the hour
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

// Update the clock every second
setInterval(updateClock, 1000);
updateClock();
