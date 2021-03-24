var apiKey = "d8d349d845326a05731f3af54ad5e65e"
var city = $("#cityToSearch").text()
var units = "metric"


function getLonLat(city,units,apiKey) {
   
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`

    fetch(apiUrl)
        .then(function(response) {
            response.json()
            .then(function(data) {
                localStorage.setItem("lonLat",JSON.stringify({"city": data.name, "lon": data.coord.lon, "lat":data.coord.lat}))
                getWeather(units,apiKey)
      });
    });
};

function getSavedLonLat(){
    var storedLonLat = JSON.parse(localStorage.getItem("lonLat"))

    var lat = storedLonLat.lat
    var lon = storedLonLat.lon

    return {lon,lat}
}

function getWeather(units,apiKey) {
    var savedLonLat = getSavedLonLat()
    
    var lat = savedLonLat.lat
    var lon = savedLonLat.lon

    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=hourly,minutely&appid=${apiKey}`
    fetch(apiUrl)
        .then(function(response) {
            response.json()
            .then(function(data) {
                console.log(data)
                setWeatherForecast(city,data)
      });
    });
};


function setWeatherForecast(city,data){
    $("#city").text(city)
    $("#temperature").text(data.current.temp)
    $("#humidity").text(data.current.humidity)
    $("#windSpeed").text(data.current.wind_speed)
    $("#uvIndex").text(data.current.uvi)

    for(var i = 0; i < 5; i++){
        $("#5-day-forecast").append(
        `<div class="col-3 bg-primary text-light rounded" id="day${i+1}">
            <div class="row"><div class="col-12"><h6 id="date${i+1}">8/16/2020</h6></div></div>
            <div class="row"><h6 id="img${i+1}">${data.daily[i].icon}</h6></div>
            <div class="row"><p id="temp${i+1}">${data.daily[i].temp.day}</p></div>
        <div class="row"><p id="humidity${i+1}">${data.daily[i].humidity}</p></div>
        </div>`) 

    }
}
  
getLonLat(city,units,apiKey);



  