var apiKey = "d8d349d845326a05731f3af54ad5e65e"
var city = "london"
var numberOfDays = 5


async function getWeatherData(city,apiKey){
let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
return await response.json();
}

async function loadData(){
   var weatherData = await getWeatherData(city,apiKey)
   localStorage.setItem("weatherData",JSON.stringify(weatherData)) 
}

function getData(){
    var longitude = JSON.parse(localStorage.getItem("weatherData")).coord.lon
    var latitude = JSON.parse(localStorage.getItem("weatherData")).coord.lat
   return {longitude,latitude}
}

loadData()

console.log(getData())



