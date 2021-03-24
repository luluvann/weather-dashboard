var apiKey = "d8d349d845326a05731f3af54ad5e65e"
/* var city = "paris" */
var numberOfDays = 5
var units = "metric"
/* var lon = "-0.1257"
var lat = "51.5085" */
/* var lon = "2.3522"
var lat = "48.8566" */


// Get and save longitude, latitude for a specified city

async function getLonLat(units,apiKey){
    var city = $("#cityToSearch").text()
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`)
    var data = await response.json()
    var newEntry = {"city": data.name, "lon": data.coord.lon, "lat": data.coord.lat}
    localStorage.setItem("lonLat",JSON.stringify(newEntry))
}

    
// Get and save weather forecast for a specified lon/lat in local storage
async function getWeatherForecast(units,apiKey){
    var lonLat = JSON.parse(localStorage.getItem("lonLat"))
    var lon = lonLat.lon
    var lat = lonLat.lat
    var city = lonLat.city

    let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=hourly,minutely&appid=${apiKey}`)
    var data = await response.json()
    return {"city": city, "lon": data}
}

async function saveWeatherForecast(){
    var newEntry = await getWeatherForecast(units,apiKey)
    console.log(newEntry)

    var savedWeatherForecast = JSON.parse(localStorage.getItem("weatherForecast"));

    if(savedWeatherForecast){
        savedWeatherForecast.push(newEntry)
        localStorage.setItem("weatherForecast",JSON.stringify(savedWeatherForecast)) 
    } else {
        var savedWeatherForecast = []
        savedWeatherForecast.push(newEntry)
        localStorage.setItem("weatherForecast",JSON.stringify(savedWeatherForecast)) 
    }
 }

getLonLat(units,apiKey)

saveWeatherForecast()




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





