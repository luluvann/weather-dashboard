var apiKey = "d8d349d845326a05731f3af54ad5e65e"
var city = "london"
var numberOfDays = 5
var units = "metric"
var lon = "-0.1257"
var lat = "51.5085"
/* var lon = "2.3522"
var lat = "48.8566" */


// Get and save longitude, latitude for a specified city

async function getLonLat(city,units,apiKey){
let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`)
return await response.json();
}

async function saveLonlat(){
    var getLonLat = await getLonLat(city,units,apiKey)
    localStorage.setItem("lonLat",JSON.stringify(getlonLat)) 
    var lonLat = JSON.parse(localStorage.getItem("lonLat"))
    console.log(lonLat)
    
    if(!lonLat){
        var newEntry = {"city": getLonLat.name, "lon": getLonLat.coord.lon, "lat": getLonLat.coord.lat}
        getLonLat.push(newEntry)
        localStorage.setItem("lonLat",JSON.stringify(getlonLat)) 
    } else {
        var newEntry = {"city": getLonLat.name, "lon": getLonLat.coord.lon, "lat": getLonLat.coord.lat}
        localStorage.setItem("lonLat",JSON.stringify(newEntry))
    }
}


    
// Get and save weather forecast for a specified lon/lat in local storage
async function getWeatherForecast(lon,lat,apiKey,units){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=hourly,minutely&appid=${apiKey}`)
    return await response.json();
    }

async function saveWeatherForecast(lon,lat,apiKey,city){
    var weatherForecast = await getWeatherForecast(lon,lat,apiKey,units)
    var savedWeatherForecast = JSON.parse(localStorage.getItem("weatherForecast"))
    
    if(savedWeatherForecast){
        localStorage.setItem("tempForecast",JSON.stringify(weatherForecast))
        var tempForecast = JSON.parse(localStorage.getItem("tempForecast"))
        savedWeatherForecast.push({"city":city,"data":tempForecast})
        localStorage.setItem("weatherForecast",JSON.stringify(savedWeatherForecast)) 
    } else {
        var savedWeatherForecast = []
        savedWeatherForecast.push({"city":city,"data":weatherForecast})
        localStorage.setItem("weatherForecast",JSON.stringify(savedWeatherForecast)) 
    }
 }

saveWeatherForecast(lon,lat,apiKey,city)




function getData(){
    var longitude = JSON.parse(localStorage.getItem("lonLat")).coord.lon
    var latitude = JSON.parse(localStorage.getItem("lonLat")).coord.lat
   return {longitude,latitude}
}

function getForecast(){
    var forecast = JSON.parse(localStorage.getItem("weatherForecast")).daily
    var array = []
    for(var i = 0 ; i< 6; i++){
        array.push(forecast[i].temp.day)
    }
   return array
}



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

function setForecast(){
    var forecast = getForecast()
    for(var i = 0; i < forecast.length; i++){
        $("#temp"+(i+1)).text(forecast[i])
    }
    
}

/* setCurrentWeatherData()
setForecast()
 */





