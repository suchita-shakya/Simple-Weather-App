//select element
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value");
const tempDescElement = document.querySelector(".temperature-description");
const locationElement = document.querySelector(".location");
const notificationElement = document.querySelector(".notification");

//app data
const weather={};

weather.temperature ={
    unit:"celsius"
}

//constant and varable
const KELVIN = 273;
//key
const key ="82005d27a116c2880c8f0fcb866998a0";

//check if browser support geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{
    notificationElement.style.display="block";
    notificationElement.innerHTML =`<p>Browser not supported</p>`;
}

//set user's position
function setPosition(position){
    let latitude= position.coords.latitude;
    let longitude= position.coords.longitude;

    getWeather(longitude,latitude);

}

//show error when there is an geolocation error
function showError(error){
    notificationElement.style.display="block";
    notificationElement.innerHTML =`<p>${error.message}</p>`;
}

//get weather from the api
function getWeather(longitude,latitude){
    let api =`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    //console.log(api);
    fetch(api)
        .then(function(response){
            let data =response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp- KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data .weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        })
}
//create display weather ti UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `<p>${weather.temperature.value}C</p>`;
    tempDescElement.innerHTML = `<p>${weather.description}</p>`;
    locationElement.innerHTML = `<p>${weather.city} , ${weather.country}</p>`;
}
//convert celcius to fahranhiet 
function celsiusToFahrenheit(temperature){
    return (temperature*9/5)+32;
}
//when user clicks on the temperature element
tempElement.addEventListener("click",function(){
    if(weather.temperature.value=== undefined) return;

    if(weather.temperature.unit == "celsius"){
        let fahranhiet = celsiusToFahrenheit(weather.temperature.value);
        fahranhiet = Math.floor(fahranhiet);
        tempElement.innerHTML = `<p>${fahranhiet}F</p>`;
        weather.temperature.unit="fahranhiet";
    }
    else{
        tempElement.innerHTML = `<p>${weather.temperature.value}C</p>`;
        weather.temperature.unit="celsius";
    }
}) 