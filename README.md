# Personal Dashboard Project

## Overview

This project is a **Personal Dashboard** that displays real-time information including:
- Current time
- Dogecoin cryptocurrency prices (using the CoinGecko API)
- Local weather (using the OpenWeatherMap API)

It is a simple web application where the user can view their local weather conditions, see current Dogecoin prices, and have the current time displayed.

## Features

1. **Real-Time Time Display**: The dashboard updates the current time dynamically and displays it in a user-friendly format (12-hour with AM/PM).

2. **Cryptocurrency Prices**: The dashboard fetches the latest Dogecoin prices from the CoinGecko API, displaying:
   - Current Dogecoin price in USD
   - 24-hour high price
   - 24-hour low price

3. **Weather Information**: The weather section of the dashboard automatically detects the user's location using the browser's geolocation feature and fetches the current weather data from the OpenWeatherMap API. It displays:
   - Temperature in Fahrenheit
   - Location (city and country)
   - A corresponding weather icon for the current weather conditions

4. **Fallback Mechanism for Weather**: If geolocation fails or is denied by the user, the dashboard defaults to displaying the weather for **Jewel City, Johannesburg**.

## Project Structure

```plaintext
.
├── index.html         # Main HTML structure
├── index.js           # JavaScript file for logic (fetching weather, cryptocurrency prices, time display)
├── index.css          # CSS file for styling
├── dogecoin-logo.jpeg # Logo used in the cryptocurrency section
└── weather-icon.png   # Fallback weather icon if the API call fails
```

## How It Works

### 1. **Time Display**

- The `updateTime` function is responsible for updating the time every minute using the `setInterval` method.
- The time is displayed in 12-hour format with AM/PM indication and dynamically updates on the page.

### 2. **Cryptocurrency Price Fetching**

- The `fetchCryptoPrices` function fetches Dogecoin prices from the CoinGecko API. It retrieves:
  - Current price
  - 24-hour high and low prices
- Data is updated on the dashboard in real time, and error handling is built-in to ensure that the UI does not break in case of a failed API call.

### 3. **Weather Information**

- The `fetchWeather` function fetches weather data from the OpenWeatherMap API using the user's latitude and longitude (retrieved via the browser's geolocation API).
- The dashboard displays the current temperature, location, and an appropriate weather icon.
- If geolocation fails, the `fetchWeatherFallback` function will fetch the weather data for Johannesburg's **Jewel City** as a fallback.

### 4. **Auto Update**

- The time is updated every minute.
- The weather information is refreshed every 10 minutes to provide updated conditions.

## Technologies Used

- **HTML**: Structuring the web page.
- **CSS**: Styling the web page, including layout and positioning.
- **JavaScript**: Implementing the logic for time display, API fetching, and error handling.
- **APIs**: 
  - **OpenWeatherMap API**: Used to fetch weather data based on the user's location.
  - **CoinGecko API**: Used to fetch the latest Dogecoin prices.

## How to Use

1. **Clone the Repository**
   ```
   git clone <repository-url>
   ```

2. **API Keys**
   - The OpenWeatherMap API key is already embedded in the project as `WEATHER_API_KEY`. You can replace it with your own key if needed.

3. **Run Locally**
   - Open `index.html` in a web browser to view the dashboard.

4. **Customization**
   - You can customize the weather API to show temperatures in Celsius by modifying the `units` parameter in the API request URL (`&units=metric`).
   - Update the cryptocurrency section to display other cryptocurrencies by changing the CoinGecko API's `ids` parameter to the desired currency.

## Prerequisites

- **API Key** for OpenWeatherMap. Obtain it from [OpenWeatherMap](https://home.openweathermap.org/users/sign_up).

## Future Improvements

- Add the ability to display more cryptocurrencies or switch between different cryptocurrencies.
- Add support for multiple weather locations and a search function to get the weather of other cities.
- Include a settings panel for user customization (time format, weather units, and preferred cryptocurrencies).

## License

This project is open-source and available under the MIT License. You are free to use, modify, and distribute the code.

## Author

By: Dumisani Nxumalo
