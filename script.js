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
    }
  });
}

websiteInit();
