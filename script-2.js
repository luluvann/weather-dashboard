var apiKey = "d8d349d845326a05731f3af54ad5e65e"
var city = $("#cityToSearch").text()
var units = "metric"
$("#errorMessage").css("display","none")

$("#searchBtn").on("click", function(){
    var city = $("#cityToSearch").val()
    getLonLat(city,units,apiKey)
    saveCitySearched(city)
})

function getLonLat(city,units,apiKey) {
   
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`

    fetch(apiUrl)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            localStorage.setItem("lonLat",JSON.stringify({"city": data.name, "lon": data.coord.lon, "lat":data.coord.lat}))
            getWeather(city,units,apiKey)
            $("#errorMessage").css("display","none")
        })
        .catch(function (error) {
            $("#"+city.charAt(0).toUpperCase() + city.slice(1, city.length).toLowerCase()).remove()
            $("#errorMessage").css("display","flex")
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
            return response.json()
        })
        .then(function(data) {    
            setCurrentWeather(city,data)
            setWeatherForecast(data)
        })
        .catch(function (error) {
            console.log(error);
        });
};

function setCurrentWeather(city, data){
    var unixTimeStamp = data.current.dt
    var milliseconds = unixTimeStamp*1000
    var longDate = new Date(milliseconds)
    var date = longDate.toDateString("en-US",{timeZoneName:"short"})
    
    $("#currentWeather").empty()
    $("#currentWeather").append(
        `<div clas="col-12">
            <div class="row"><h4>${city} on ${date}</h4></div>
            <div class="row row-align"><img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png"></img><h4> ${data.current.weather[0].description}</h4></div>
            <div class="row"><p>Temperature: ${data.current.temp}°C</p></div>
            <div class="row"><p>Humidity: ${data.current.humidity}%</p></div>
            <div class="row"><p>Wind Speed: ${data.current.wind_speed}km/h</p></div>
            <div class="row"><p>UV Index: <p class="uv" id="uvi">${data.current.uvi}</p></p></div>
        </div>`
    )
    uvIndex(data.current.uvi)

}

function setWeatherForecast(data){    
    $("#5-day-forecast").empty()

    for(var i = 1; i < 6; i++){
        var unixTimeStamp = data.daily[i].dt
        var milliseconds = unixTimeStamp*1000
        var longDate = new Date(milliseconds)
        var date = longDate.toDateString("en-US",{timeZoneName:"short"})
       
        $("#5-day-forecast").append(     

        `<div class="col-lg-3 col-md-12 col-sm-12 bg-primary text-light rounded m-1" id="day${i}">
            <div class="row"><div class="col-12"><h6 id="date${i}">${date}</h6></div></div>
            <div class="row row-align"><img id="img${i}" src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png"></img><h6> ${data.daily[i].weather[0].description}</h6></div>
            <div class="row"><p id="temp${i+1}">Temp: ${data.daily[i].temp.day}°C</p></div>
            <div class="row"><p id="humidity${i+1}">Humid: ${data.daily[i].humidity}%</p></div>
        </div>`
        )
    }
}

function saveCitySearched(city){
    var city = city.charAt(0).toUpperCase() + city.slice(1, city.length).toLowerCase()
    $("#storedCities").append(
        `<button class="btn p-0" id="${city}"><li class="list-group-item">${city}</li></button>`
    )
}

$("#storedCities").on("click","button",function(){
    var city = $(this).attr("id")
    getLonLat(city,units,apiKey)
})


function uvIndex(uvi){
    if(uvi<3){
        $("#uvi").addClass("low")
    } else if (uvi<6){
        $("#uvi").addClass("moderate")
    } else if (uvi < 8){
        $("#uvi").addClass("high")
    } else if(uvi < 11){
        $("#uvi").addClass("veryHigh")
    } else { $("#uvi").addClass("extreme")}
}

  