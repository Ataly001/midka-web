const forecastCities = {
    astana: { name: "Astana", latitude: 51.17, longitude: 71.43 },
    almaty: { name: "Almaty", latitude: 43.24, longitude: 76.89 },
    shymkent: { name: "Shymkent", latitude: 42.32, longitude: 69.59 }
};

const weatherForm = document.getElementById("weather-form");
const weatherCity = document.getElementById("weather-city");
const weatherStatus = document.getElementById("weather-status");
const weatherDays = document.getElementById("weather-days");
const weatherButton = weatherForm.querySelector("button");

function forecastUrl(city) {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", city.latitude);
    url.searchParams.set("longitude", city.longitude);
    url.searchParams.set("daily", "temperature_2m_min,temperature_2m_max");
    url.searchParams.set("forecast_days", "3");
    url.searchParams.set("timezone", "auto");
    return url;
}

function showForecast(daily) {
    if (!Array.isArray(daily?.time)) {
        return 0;
    }

    let count = 0;
    daily.time.forEach(function (date, index) {
        const low = daily.temperature_2m_min?.[index];
        const high = daily.temperature_2m_max?.[index];
        if (typeof date !== "string" || !Number.isFinite(low) || !Number.isFinite(high)) {
            return;
        }

        const column = document.createElement("div");
        column.className = "col-12 col-sm-4";
        const card = document.createElement("article");
        card.className = "weather-card";
        const heading = document.createElement("h3");
        heading.className = "h5";
        heading.textContent = date;
        const temperature = document.createElement("p");
        temperature.className = "mb-0";
        temperature.textContent = low + " °C to " + high + " °C";
        card.appendChild(heading);
        card.appendChild(temperature);
        column.appendChild(card);
        weatherDays.appendChild(column);
        count++;
    });

    return count;
}

weatherForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const city = forecastCities[weatherCity.value];
    weatherDays.textContent = "";
    if (!city) {
        weatherStatus.textContent = "Choose one of the listed cities.";
        return;
    }
    weatherStatus.textContent = "Loading forecast for " + city.name + "…";
    weatherButton.disabled = true;
    weatherCity.disabled = true;

    try {
        const response = await fetch(forecastUrl(city));
        if (!response.ok) {
            throw new Error("Forecast request failed.");
        }
        const data = await response.json();
        const count = showForecast(data?.daily);
        weatherStatus.textContent = count
            ? city.name + " forecast is ready."
            : "No forecast is available for " + city.name + ".";
    } catch {
        weatherStatus.textContent = "Could not load the forecast. Please try again.";
    } finally {
        weatherButton.disabled = false;
        weatherCity.disabled = false;
    }
});


weatherCity.addEventListener("change", function () {
    weatherDays.textContent = "";
    weatherStatus.textContent = "";
});
