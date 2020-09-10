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
  return `${day}, ${date}/${month}`;
}
function showHour() {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

showDate();
showHour();

// Display weather and forecast
function displayWeather(response) {
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#date").innerHTML = showDate();
  document.querySelector("#time").innerHTML = showHour();
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute("src", changeImage(response.data.weather[0].icon));
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
}

function changeImage(icon) {
  let sunny = "media/sun.svg";
  let sunnyCloudy = "media/sun-clouds.svg";
  let sunnyCloudyRainy = "media/sun-clouds-rain.svg";
  let cloudy = "media/clouds.svg";
  let rainy = "media/rain.svg";
  let stormy = "media/thunderstorm.svg";
  let snowy = "media/snow.svg";
  let clearNight = "media/moon.svg";
  let cloudyNight = "media/moon-clouds.svg";
  let rainyNight = "media/moon-clouds-rain.svg";
  let stormyNight = "media/moon-thunderstorm.svg";
  let snowyNight = "media/moon-clouds-snow.svg";

  if (icon === "01d") {
    return sunny;
  } else if (icon === "01n") {
    return clearNight;
  } else if (icon === "02d") {
    return sunnyCloudy;
  } else if (icon === "03d" || icon === "04d") {
    return cloudy;
  } else if (icon === "02n" || icon === "03n" || icon === "04n") {
    return cloudyNight;
  } else if (icon === "09d") {
    return rainy;
  } else if (icon === "10d") {
    return sunnyCloudyRainy;
  } else if (icon === "09n" || icon === "10n") {
    return rainyNight;
  } else if (icon === "11d") {
    return stormy;
  } else if (icon === "11n") {
    return stormyNight;
  } else if (icon === "13d") {
    return snowy;
  } else if (icon === "13n") {
    return snowyNight;
  } else {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    let str = forecast.dt_txt;
    let res = str.substring(11, 16);
    forecastElement.innerHTML += `
    <div class="col-2">
      <p3>
        ${res}
      </p3>
      <img src="${changeImage(forecast.weather[0].icon)}" id="icon" />
      <div class="weather-preview-temperature">
        <strong>
          ${Math.round(forecast.main.temp)}°C
        </strong>
      </div>
    </div>
  `;
  }
}

function searchCity(city) {
  let apiKey = "951dd6b05bd0b3d85b13d8ab4de1c854";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-symbol");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-symbol");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Paris");
