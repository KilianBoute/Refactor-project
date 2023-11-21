
import API from "./config.js";

const  getWeatherData = async (cityInput) => {
    try {
        const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + cityInput + "&days=7&aqi=no&alerts=no");
        const data = await response.json();
        return data;
    } catch (error) {
        alert("Hey are you sure you are not holding up your map upside down?");
    };
}

export default getWeatherData;