import API from "./config.js";
const cardContainer = document.querySelector(".container");
// Amount of days forecast should be (max 7)
const DAY_AMOUNT = 5;

async function getWeatherData(cityInput) {
    try {
        const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + cityInput + "&days=7&aqi=no&alerts=no");
        const data = await response.json();
        return data;
    } catch (error) {
        alert("Hey are you sure you are not holding up your map upside down?");
    };
}

const emptyCardContainer = () => {
    while (cardContainer.lastChild) {
        cardContainer.removeChild(cardContainer.lastChild);
    };
}

const displayWeatherForDay = (data, index) => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date()
    const dayOfTheWeek = weekdays[(date.getDay() + index) % 7]

    const card = document.createElement('div');
    card.classList.add("card");

    if (index === 0) card.classList.add("main-card");

    cardContainer.appendChild(card);

    const imageBox = document.createElement('div');
    imageBox.classList.add("imgBx");
    card.appendChild(imageBox);

    const cardImg = document.createElement('img');
    cardImg.src = data.forecast.forecastday[index].day.condition.icon;
    imageBox.appendChild(cardImg);

    const contentBox = document.createElement("div");
    contentBox.classList.add("contentBx");
    card.appendChild(contentBox);

    const cardHeader = document.createElement("h2");
    cardHeader.innerHTML = dayOfTheWeek;
    contentBox.appendChild(cardHeader);

    const tempDescription = document.createElement("h4");
    tempDescription.innerHTML = data.forecast.forecastday[index].day.condition.text;
    contentBox.appendChild(tempDescription);

    const currentTempBox = document.createElement("div");
    currentTempBox.classList.add("color");
    contentBox.appendChild(currentTempBox)

    const currentTempHeader = document.createElement("h3");
    currentTempHeader.innerHTML = "Temp:"
    currentTempBox.appendChild(currentTempHeader);

    const currentTemp = document.createElement("span");
    currentTemp.classList.add("current-temp");
    currentTemp.innerHTML = data.forecast.forecastday[index].day.avgtemp_c + "°C";
    currentTempBox.appendChild(currentTemp);

    const minMaxTemperatures = document.createElement("div");
    minMaxTemperatures.classList.add("details");
    contentBox.appendChild(minMaxTemperatures);

    const minMaxTempHeader = document.createElement("h3");
    minMaxTempHeader.innerHTML = "More:";
    minMaxTemperatures.appendChild(minMaxTempHeader);

    const minTemp = document.createElement("span");
    minTemp.classList.add("min-temp");
    minTemp.innerHTML = data.forecast.forecastday[index].day.mintemp_c + "°C";
    minMaxTemperatures.appendChild(minTemp);

    const maxTemp = document.createElement("span");
    maxTemp.classList.add("max-temp");
    maxTemp.innerHTML = data.forecast.forecastday[index].day.maxtemp_c + "°C";
    minMaxTemperatures.appendChild(maxTemp);
}

const handleWeatherData = (weatherData) => {
    const cityNameContainer = document.querySelector('.city-info');
    cityNameContainer.textContent = weatherData.location.name + ", " + weatherData.location.country;
    for (let i = 0; i < DAY_AMOUNT; i++) {
        displayWeatherForDay(weatherData, i);
    }
}

async function handleSearchSubmit() {
    const cityInput = document.getElementById('cityName').value.trim();
    if (cityInput) {
        const weatherData = await getWeatherData(cityInput);
        emptyCardContainer();
        handleWeatherData(weatherData);
    } else {
        alert('Please enter a value first');
    }
}

const setEventListeners = () => {

    const submitButton = document.querySelector('#submit-search');
    const inputField = document.querySelector('#cityName');

    inputField.addEventListener('keyup', (event) => {
        if (event.code === "Enter") {
            handleSearchSubmit();
        }
    });
    submitButton.addEventListener('click', () => {
        handleSearchSubmit();
    });

}

setEventListeners();