const apiKey = "0b9d65297f7c49cda99163050242710"; // Replace with your WeatherAPI key

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      if (response.status === 400) {
        alert("Invalid request. Please check the city name.");
      } else if (response.status === 401) {
        alert("Invalid API key. Please check your API key.");
      } else {
        alert("Something went wrong. Please try again.");
      }
      return;
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert("Error fetching weather data. Please try again later.");
  }
}

function displayWeather(data) {
  const dialog = document.getElementById("weatherDialog");

  const cityName = document.getElementById("cityName");
  const country = document.getElementById("country");
  const currentTime = document.getElementById("currentTime");
  const temperature = document.getElementById("temperature");
  const weatherDescription = document.getElementById("weatherDescription");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("windSpeed");

  // Set the weather details
  cityName.textContent = `Weather in ${data.location.name}`;
  country.textContent = `Country: ${data.location.country}`;
  currentTime.textContent = `Local Time: ${data.location.localtime}`;
  temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
  weatherDescription.textContent = `Condition: ${data.current.condition.text}`;
  humidity.textContent = `Humidity: ${data.current.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} kph`;

  // Show the dialog
  dialog.showModal();
}

function closeDialog() {
  const dialog = document.getElementById("weatherDialog");
  dialog.close();
}