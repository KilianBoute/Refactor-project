
import displayWeatherForDay from "./weatherCard.js";
import getWeatherData from "./apiCalls.js";
import emptyContainer from "./emptyContainer.js";
const cardContainer = document.querySelector(".container");
const DAY_AMOUNT = 5;


const handleWeatherData = (weatherData) => {
    const cityNameContainer = document.querySelector('.city-info');
    cityNameContainer.textContent = weatherData.location.name + ", " + weatherData.location.country;
    for (let i = 0; i < DAY_AMOUNT; i++) {
        displayWeatherForDay(weatherData, i, cardContainer);
    }
}

const handleSearchSubmit = async () => {
    const cityInput = document.getElementById('cityName').value.trim();
    if (cityInput) {
        const weatherData = await getWeatherData(cityInput);
        emptyContainer(cardContainer);
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