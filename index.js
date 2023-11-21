
import displayWeatherForDay from "./weatherCard.js";
const cardContainer = document.querySelector(".container");
const DAY_AMOUNT = 5;

import API from "./config.js";

async function getWeatherData(cityInput) {
    try {
        const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + cityInput + "&days=7&aqi=no&alerts=no");
        const data = await response.json();
        return data;
    } catch (error) {
        alert("Hey are you sure you are not holding up your map upside down?");
    };
}

export default getWeatherData;

const emptyCardContainer = () => {
    while (cardContainer.lastChild) {
        cardContainer.removeChild(cardContainer.lastChild);
    };
}

const handleWeatherData = (weatherData) => {
    const cityNameContainer = document.querySelector('.city-info');
    cityNameContainer.textContent = weatherData.location.name + ", " + weatherData.location.country;
    for (let i = 0; i < DAY_AMOUNT; i++) {
        displayWeatherForDay(weatherData, i, cardContainer);
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