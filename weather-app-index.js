function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

// Feature #1
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Feature #2
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Bonus Feature
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
//On your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city. 🙀 Bonus point:Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${temp}`;
}
function showCityElement(event) {
  event.preventDefault();
  let apiKey = "5a43febac9e08234e55ed941a9b78425";
  let units = "metric";
  let city = document.querySelector("input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=sydney&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
  let citySearchName = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${citySearchName.value}`;
}

let form = document.querySelector("form");
form.addEventListener("submit", showCityElement);

//Current Location

function getTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#number");
  tempElement.innerHTML = `${temperature}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
}

function getLocation(response) {
  let apiKey = "5a43febac9e08234e55ed941a9b78425";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&untits=metric$=&appid=${apiKey}`;
  axios.get(url).then(getTemperature);

  console.log(response);
}
function retrievePosition() {
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}
let button = document.querySelector("#current-location");
button.addEventListener("click", retrievePosition);
