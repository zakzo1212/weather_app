const apiKey = "{your weatherbit API key}";

const locationElement = document.querySelector(".location");
const temperatureElement = document.querySelector(".temperature .value");
const aqiElement = document.querySelector(".aqi .value");
const conditionsElement = document.querySelector(".conditions");
const outfitElement = document.querySelector(".outfit");
const fetchButton = document.getElementById("fetchButton");

// Function to handle fetching weather data and providing outfit recommendations
function fetchWeatherData() {
  // Get user's location coordinates using Geolocation API
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Make API request to Weatherbit Current Weather API
        fetch(
          `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${apiKey}`
        )
          .then((response) => response.json())
          .then((data) => {
            // Extract the necessary weather and AQI data from the API response
            const { city_name, country_code, temp, weather, aqi } =
              data.data[0];

            // Update the UI with the weather and AQI information
            locationElement.textContent = `${city_name}, ${country_code}`;
            temperatureElement.textContent = temp.toFixed(1);
            aqiElement.textContent = aqi;
            conditionsElement.textContent = weather.description;

            // Provide outfit recommendations based on weather conditions
            outfitElement.textContent = getOutfitRecommendation(
              temp,
              weather.code
            );
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
            // Handle error fetching weather data
          });
      },
      function (error) {
        console.error("Error fetching user's location:", error.message);
        // Handle error fetching user's location
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    // Handle lack of geolocation support
  }
}

// Event listener for the fetch button
fetchButton.addEventListener("click", fetchWeatherData);

// Function to provide outfit recommendations based on weather conditions
function getOutfitRecommendation(temperature, weatherCode) {
  // Outfit recommendations based on temperature ranges and weather codes
  if (temperature <= 10) {
    return "It's chilly! Consider wearing a warm sweater, jeans, and a coat.";
  } else if (temperature > 10 && temperature <= 20) {
    return "It's cool! You can go for a light jacket, jeans, and a comfortable shirt.";
  } else if (temperature > 20 && temperature <= 30) {
    return "It's warm! Opt for a t-shirt, shorts, and sunglasses.";
  } else {
    return "It's hot! Wear light and breathable clothing like a loose-fitting shirt, shorts, and a hat.";
  }
}
