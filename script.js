var apiKey = "d8d349d845326a05731f3af54ad5e65e"
var city = "london"
var numberOfDays = 5
var units = "metric"


async function getWeatherData(city,units,apiKey){
let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`)
return await response.json();
}

async function getWeatherForecast(lon,lat,apiKey){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    return await response.json();
    }
    

async function loadData(){
   var weatherData = await getWeatherData(city,units,apiKey)
   localStorage.setItem("weatherData",JSON.stringify(weatherData)) 
}

async function loadData2(lon,lat,apiKey){
    var weatherData = await getWeatherForecast(lon,lat,apiKey)
    localStorage.setItem("weatherForecast",JSON.stringify(weatherData)) 
 }



function getData(){
    var longitude = JSON.parse(localStorage.getItem("weatherData")).coord.lon
    var latitude = JSON.parse(localStorage.getItem("weatherData")).coord.lat
    var temperature = JSON.parse(localStorage.getItem("weatherData")).main.temp
    var humidity = JSON.parse(localStorage.getItem("weatherData")).main.humidity
    var windSpeed = JSON.parse(localStorage.getItem("weatherData")).wind.speed
   return {longitude,latitude,temperature,humidity,windSpeed}
}

loadData()


function setCurrentWeatherData(){
    var currentWeather = getData()
    console.log(currentWeather)
    $("#temperature").text(currentWeather.temperature)
    $("#humidity").text(currentWeather.humidity)
    $("#windSpeed").text(currentWeather.windSpeed)
    var lon = currentWeather.longitude
    var lat = currentWeather.latitude
    loadData2(lon,lat,apiKey)

}

setCurrentWeatherData()





