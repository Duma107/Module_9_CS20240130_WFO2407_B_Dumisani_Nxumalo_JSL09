document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const WEATHER_API_KEY = 'd8c866d6968ceb0c4d5833bddb9d8ecc';
    const WEATHER_UPDATE_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds
    const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

    // Function to Update Current Time
    function updateTime() {
        const timeElement = document.getElementById('time');
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        timeElement.textContent = `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    // Function to Get User's Current Location as a Promise
    function getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    },
                    (error) => {
                        reject(error);
                    }
                );
            } else {
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        });
    }
    // Function to Update Current Time
    function updateTime() {
        const timeElement = document.getElementById('time');
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        timeElement.textContent = `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    // Function to Fetch Cryptocurrency Prices from CoinGecko API
    function fetchCryptoPrices() {
        fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
            .then(res => {
                if (!res.ok) {
                    throw Error("Something went wrong")
                }
                return res.json()
            })
            .then(data => {
                document.getElementById("current-price").textContent = `$${data.market_data.current_price.usd}`;
                document.getElementById("high-price").textContent = `$${data.market_data.high_24h.usd}`;
                document.getElementById("low-price").textContent = `$${data.market_data.low_24h.usd}`;
            })
            .catch(err => console.error(err))
    }

    // Function to Fetch Weather Information from OpenWeatherMap API
    async function fetchWeather() {
        try {
            const location = await getCurrentLocation();
            const { latitude, longitude } = location;
            const response = await fetch(`${WEATHER_API_URL}?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=imperial`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Weather Data:', data); // For debugging purposes
            updateWeatherUI(data);
        } catch (error) {
            console.error('Error fetching weather information:', error);
            // Optionally, set a default location if geolocation fails
            if (error.code === 1 || error.message.includes('Geolocation')) { // Denied or unsupported
                alert('Unable to retrieve your location. Using New York City as the default location.');
                fetchWeatherFallback();
            } else {
                displayWeatherFallback();
            }
        }
    }

    // Function to Update Weather UI
    function updateWeatherUI(data) {
        if (data && data.main && data.weather && data.weather[0]) {
            // Update Temperature
            const temperature = Math.round(data.main.temp);
            document.getElementById('temperature').textContent = `${temperature}°F`;

            // Update Location
            document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;

            // Update Weather Icon
            const weatherIcon = document.getElementById('weather-icon');
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            weatherIcon.src = iconUrl;
            weatherIcon.alt = data.weather[0].description;
            weatherIcon.style.display = 'block'; // Show the icon after loading
        } else {
            console.error('Incomplete weather data:', data);
            displayWeatherFallback();
        }
    }

    // Function to Fetch Weather with Fallback Location
    async function fetchWeatherFallback() {
        try {
            const defaultLat = -26.2023;
            const defaultLon = 28.0466;
            const response = await fetch(`${WEATHER_API_URL}?lat=${defaultLat}&lon=${defaultLon}&appid=${WEATHER_API_KEY}&units=imperial`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fallback Weather Data:', data); // For debugging purposes
            updateWeatherUI(data);
        } catch (error) {
            console.error('Error fetching fallback weather information:', error);
            displayWeatherFallback();
        }
    }

    // Function to Display Weather Fallback (N/A)
    function displayWeatherFallback() {
        document.getElementById('temperature').textContent = 'N/A';
        document.getElementById('location').textContent = 'N/A';
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.src = 'weather-icon.png'; // Ensure this path is correct
        weatherIcon.alt = 'Weather unavailable';
        weatherIcon.style.display = 'block'; // Ensure the icon is visible
    }

    // Function to Initialize Dashboard
    function initializeDashboard() {
        updateTime();
            fetchCryptoPrices();
            fetchWeather();
    
        // Update Time Every Minute
        setInterval(updateTime, 60000);
    
        // Update Weather Every 10 Minutes
        setInterval(fetchWeather, WEATHER_UPDATE_INTERVAL);

        // Update Crypto Prices Every 5 Minutes
        setInterval(fetchCryptoPrices, 5 * 60 * 1000);
    }

// Run Initialization
initializeDashboard();
});