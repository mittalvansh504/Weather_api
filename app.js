const API_KEY = "e29d1c39ae6940002e9eccc66d640074"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

let submitButton = document.querySelector(".sub");
let cityInput = document.querySelector(".city");

const getWeather = async (cityName) => {
    const finalURL = `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`; 

    try {
        const response = await fetch(finalURL);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`City not found: ${cityName}`);
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Weather data Received:", data);

        const currentTemp = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const cityNameFromAPI = data.name;

        alert(`Weather in ${cityNameFromAPI}:\nTemperature: ${currentTemp}°C\nCondition: ${weatherDescription}`);

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert(`Failed to fetch weather data: ${error.message}`);
    }
};

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    
    const cityName = cityInput.value.trim();
    
    if (cityName === "") {
        alert("Please enter a city name.");
        return;
    }
    
    console.log(`Searching for city: ${cityName}`);
    getWeather(cityName);
});