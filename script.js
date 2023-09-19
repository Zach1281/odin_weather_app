const apiKey = "77a33522a90e42f0a1d221714231809";

function websiteInit() {
  createEventListeners();
}

function createEventListeners() {
  const input = document.getElementById("location");
  input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const response = await fetch(
        "http://api.weatherapi.com/v1/forecast.json?key=" +
          apiKey +
          "&q=" +
          input.value +
          "&days=1&aqi=no&alerts=no",
        { mode: "cors" }
      );
      const data = await response.json();
      createCurrentWeather(data);
    }
  });
}

function createCurrentWeather(data) {
  // query statically typed html elements
  const location = document.querySelector(".location");
  const icon = document.querySelector(".icon");
  const currentTemp = document.querySelector(".current-temp");
  const maxTemp = document.querySelector(".max-temp");
  const minTemp = document.querySelector(".min-temp");

  // create dyncmic html elements
  const iconImg = document.createElement("img");

  // remove anything from elements if there was any
  location.textContent = "";
  if (icon.hasChildNodes()) {
    icon.firstChild.remove();
  }
  currentTemp.textContent = "";
  maxTemp.textContent = "";
  minTemp.textContent = "";

  // append elements with weather api info provided user has input a valid location
  location.textContent = data.location.name + ", " + data.location.region;
  iconImg.src = data.current.condition.icon;
  icon.appendChild(iconImg);
  currentTemp.textContent = data.current.temp_f + "°";
  //   console.log(data.forecast.forecastday);
  maxTemp.textContent = data.forecast.forecastday[0].day.maxtemp_f + "°";
  minTemp.textContent = data.forecast.forecastday[0].day.mintemp_f + "°";
}

websiteInit();
