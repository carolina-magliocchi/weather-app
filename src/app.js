// Formate Date and Time
function showDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let month = months[now.getMonth()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let p1 = document.querySelector("p1");
  let p2 = document.querySelector("p2");
  p1.innerHTML = `${day}, ${date}/${month}`;
  p2.innerHTML = `${hours}:${minutes}`;
}
showDate();

// Search city and current location
function displayWeather(response) {
  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "951dd6b05bd0b3d85b13d8ab4de1c854";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "951dd6b05bd0b3d85b13d8ab4de1c854";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Paris");

// Change temperature Celsius - Fahrenheit
function changeToFahrenheit(event) {
  event.preventDefault();
  let temperature = 25;
  let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);
  let fahrenheitSymbol = document.querySelector("#temperature");
  fahrenheitSymbol.innerHTML = fahrenheitTemperature;
}
let fahrenheit = document.querySelector("#fahrenheit-symbol");
fahrenheit.addEventListener("click", changeToFahrenheit);

function changeToCelsius(event) {
  event.preventDefault();
  let temperature = 77;
  let celsiusTemperature = Math.round(((temperature - 32) * 5) / 9);
  let celsiusSymbol = document.querySelector("#temperature");
  celsiusSymbol.innerHTML = celsiusTemperature;
}
let celsius = document.querySelector("#celsius-symbol");
celsius.addEventListener("click", changeToCelsius);
