const digitalClock = document.getElementById('digitalClock');
const analogClock = document.getElementById('analogClock');
const toggleButton = document.getElementById('toggleClock');
const timezoneSelect = document.getElementById('timezone');
const designSelector = document.getElementById('designSelector');
const digitalDesignSelector = document.getElementById('digitalDesignSelector');
const clockDesignSelect = document.getElementById('clockDesign');
const digitalClockDesignSelect = document.getElementById('digitalClockDesign');

let showAnalog = false; // Tracks whether analog or digital clock is displayed

// Function to detect user's local timezone and set it
function setUserTimezone() {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const optionExists = [...timezoneSelect.options].some(option => option.value === userTimezone);

    if (optionExists) {
        timezoneSelect.value = userTimezone;  // Set the dropdown to user's timezone
    }
}

// Handle clock toggle (digital/analog)
toggleButton.addEventListener('click', () => {
    showAnalog = !showAnalog;  // Toggle between clocks
    if (showAnalog) {
        digitalClock.style.display = 'none';
        analogClock.style.display = 'block';
        toggleButton.textContent = 'Switch to Digital';
        designSelector.style.display = 'block';  // Show analog design selector
        digitalDesignSelector.style.display = 'none';  // Hide digital design selector
    } else {
        digitalClock.style.display = 'block';
        analogClock.style.display = 'none';
        toggleButton.textContent = 'Switch to Analog';
        designSelector.style.display = 'none';  // Hide analog design selector
        digitalDesignSelector.style.display = 'block';  // Show digital design selector
    }
});

// Update time for both clocks
function updateTime() {
    const selectedTimezone = timezoneSelect.value;
    const now = new Date().toLocaleString('en-US', { timeZone: selectedTimezone });
    const dateObj = new Date(now);

    // Digital clock display
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');
    digitalClock.textContent = `${hours}:${minutes}:${seconds}`;

    // Analog clock display
    const secondHand = analogClock.querySelector('.second-hand');
    const minHand = analogClock.querySelector('.min-hand');
    const hourHand = analogClock.querySelector('.hour-hand');

    const secondsRatio = dateObj.getSeconds() / 60;
    const minutesRatio = (secondsRatio + dateObj.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + dateObj.getHours()) / 12;

    setRotation(secondHand, secondsRatio);
    setRotation(minHand, minutesRatio);
    setRotation(hourHand, hoursRatio);
}

// Set the rotation of analog clock hands
function setRotation(element, rotationRatio) {
    element.style.transform = `rotate(${rotationRatio * 360}deg)`;
}

// Apply the selected analog clock design
function applyClockDesign() {
    analogClock.classList.remove('classic', 'modern', 'minimalist', 'futuristic');
    const selectedDesign = clockDesignSelect.value;
    analogClock.classList.add(selectedDesign); // Apply selected design
}

// Apply the selected digital clock design
function applyDigitalClockDesign() {
    digitalClock.classList.remove('simple', 'bold', 'neon');
    const selectedDesign = digitalClockDesignSelect.value;
    digitalClock.classList.add(selectedDesign); // Apply selected design
}

// Event listener for timezone changes
timezoneSelect.addEventListener('change', updateTime);

// Event listener for analog clock design changes
clockDesignSelect.addEventListener('change', () => {
    applyClockDesign(); // Apply design for analog clock
});

// Event listener for digital clock design changes
digitalClockDesignSelect.addEventListener('change', () => {
    applyDigitalClockDesign(); // Apply design for digital clock
});

// Initialize the application
function init() {
    setUserTimezone();
    updateTime(); // Initial time update
    applyClockDesign();  // Initialize with default analog design
    applyDigitalClockDesign(); // Initialize with default digital design
    setInterval(updateTime, 1000); // Update clocks every second
}

init();
