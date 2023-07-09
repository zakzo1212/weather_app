// Replace {YOUR_API_KEY} with your actual Weatherbit API key
const apiKey = "17edb2ec3d374f8188cbb398663e5929";

const locationElement = document.querySelector(".location");
const temperatureElement = document.querySelector(".temperature");
const conditionsElement = document.querySelector(".conditions");

// Get user's location coordinates using Geolocation API
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Make API request to Weatherbit
      fetch(
        `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Extract the necessary weather data from the API response
          const { city_name, country_code, temp, weather } = data.data[0];

          // Update the UI with the weather information
          locationElement.textContent = `${city_name}, ${country_code}`;
          temperatureElement.textContent = `${temp}°C`;
          conditionsElement.textContent = weather.description;
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
