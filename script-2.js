var apiKey = "d8d349d845326a05731f3af54ad5e65e"
var city = $("#cityToSearch").text()
var units = "metric"

$("#searchBtn").on("click", function(){
    var city = $("#cityToSearch").val()
    getLonLat(city,units,apiKey)
})

function getLonLat(city,units,apiKey) {
   
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`

    fetch(apiUrl)
        .then(function(response) {
            response.json()
            .then(function(data) {
                localStorage.setItem("lonLat",JSON.stringify({"city": data.name, "lon": data.coord.lon, "lat":data.coord.lat}))
                getWeather(city,units,apiKey)
      });
    });
};

function getSavedLonLat(){
    var storedLonLat = JSON.parse(localStorage.getItem("lonLat"))

    var lat = storedLonLat.lat
    var lon = storedLonLat.lon
    var city = storedLonLat.city

    return {lon,lat,city}
}

function getWeather(city,units,apiKey) {
    var savedLonLat = getSavedLonLat()
    
    var lat = savedLonLat.lat
    var lon = savedLonLat.lon
    var city = savedLonLat.city

    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=hourly,minutely&appid=${apiKey}`
    fetch(apiUrl)
        .then(function(response) {
            response.json()
            .then(function(data) {
                console.log(data)
                setCurrentWeather(city,data)
                setWeatherForecast(city,data)
      });
    });
};

function setCurrentWeather(city, data){
    saveCitySearched(city)
    $("#currentWeather").empty()
    $("#currentWeather").append(
        `<div clas="col-12">
            <div class="row"><h3>${city}</h3></div>
            <div class="row"><p>Temperature: ${data.current.temp}°C</p></div>
            <div class="row"><p>Humidity: ${data.current.humidity}%</p></div>
            <div class="row"><p>Wind Speed: ${data.current.wind_speed}km/h</p></div>
            <div class="row"><p>UV Index: ${data.current.uvi}</p></div>
        </div>`
    )
}

function setWeatherForecast(city,data){    
    $("#5-day-forecast").empty()

    for(var i = 0; i < 5; i++){
        var unixTimeStamp = data.daily[i].dt
        var milliseconds = unixTimeStamp*1000
        var longDate = new Date(milliseconds)
        var date = longDate.toDateString("en-US",{timeZoneName:"short"})
       
        $("#5-day-forecast").append(     

        `<div class="col-lg-3 col-md-12 col-sm-12 bg-primary text-light rounded m-1" id="day${i+1}">
            <div class="row"><div class="col-12"><h6 id="date${i+1}">${date}</h6></div></div>
            <div class="row"><img id="img${i+1}" src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png"></img></div>
            <div class="row"><p id="temp${i+1}">Temp: ${data.daily[i].temp.day}°C</p></div>
            <div class="row"><p id="humidity${i+1}">Humid: ${data.daily[i].humidity}%</p></div>
        </div>`
        )
    }
}

function saveCitySearched(city){
    $("#storedCities").append(
        `<li class="list-group-item">${city}</li>`
    )
}
  




  