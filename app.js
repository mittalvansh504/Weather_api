// **CRITICAL**: Replace 'YOUR_API_KEY_HERE' with your actual OpenWeatherMap API key.
const API_KEY = "e29d1c39ae6940002e9eccc66d640074"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

let submitButton = document.querySelector(".sub");
let cityInput = document.querySelector(".city");

const getWeather = async (cityName) => {
    // 1. **FIXED**: Dynamically construct the URL using the entered city name
    const finalURL = `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`; 
    // '&units=metric' requests temperature in Celsius

    try {
        const response = await fetch(finalURL);
        
        // 2. **FIXED**: Correctly check the response status (lowercase 'response')
        if (!response.ok) {
            // If city name is invalid, OpenWeatherMap returns status 404
            if (response.status === 404) {
                 throw new Error(`City not found: ${cityName}`);
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Weather data Received:", data);

        // 3. **FIXED**: Correctly access the temperature data (OpenWeatherMap structure)
        const currentTemp = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const cityNameFromAPI = data.name; // Use the city name returned by the API

        // Display the results
        alert(`Weather in ${cityNameFromAPI}:\nTemperature: ${currentTemp}°C\nCondition: ${weatherDescription}`);

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert(`Failed to fetch weather data: ${error.message}`);
    }
};

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    
    const cityName = cityInput.value.trim(); // Get and clean up the input
    
    if (cityName === "") {
        alert("Please enter a city name.");
        return;
    }
    
    console.log(`Searching for city: ${cityName}`);
    getWeather(cityName); // Pass the city name to the function
});