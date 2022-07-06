var APIkey = config.MY_KEY;
var city = "";
var lat = "";
var lon = "";
var cityLog = "";
var temp = document.getElementById('temp')
var windSpeed = document.getElementById('windSpeed')
var humid = document.getElementById('humid')
var UV = document.getElementById('UV')
var forecast = document.getElementById('data')
var date = document.getElementById('date')
var searchHistory = document.getElementById('searchHistory')
//let url = 'api.openweathermap.org/data/2.5/weather?q=London&appid={APIkey}';

document.getElementById("searchBtn").addEventListener('click',function(){
var city = document.getElementById("City").value;
console.log(APIkey);

fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+APIkey)
.then(response => {
    if (response.status === 400 || response.status === 404) {
        throw new Error('Alert');
    }
    return response.json();
})

.then(function (data) {
      lat = data.coord.lat;
      lon = data.coord.lon;})

.then(async function() {
 fetch('https://api.openweathermap.org/data/3.0/onecall?lat='+lat+'&lon='+lon+'&units=metric&exclude=minutely,hourly,alerts&appid='+APIkey)
.then(response => {
    if (response.status === 400 || response.status === 404) {
        throw new Error('Alert');
    }
    return response.json();
})
.then(function (data) {
    date.innerHTML = new Date(data.current.dt*1000);
    temp.innerHTML = "Temp: "+data.current.temp+"C";
    windSpeed.innerHTML = "Wind: "+data.current.wind_speed+"MPH";
    humid.innerHTML = "Humidity: "+data.current.humidity+" %";
    UV.innerHTML = "UV Index: "+data.current.uvi;
    document.getElementById('currentImg').src = "http://openweathermap.org/img/w/"+data.current.weather[0].icon+".png";
    var days = "";
    for (let i=0; i<data.daily.length;i++)
    {
        days += "<div class=forecasting><img src=http://openweathermap.org/img/w/"+data.daily[i].weather[0].icon+".png></img><p>"+new Date(data.daily[i].dt+1000)+"</p><p>Temp: "+data.daily[i].temp.day+" C</p><p>Wind: "+data.daily[i].wind_speed+" MPH</p><p>Humidity: "+data.daily[i].humidity+" %</p></div>";

    }
    forecast.innerHTML=days; 
    })
})

.catch(err => alert("Please enter valid city name."))

cityLog += "<li class=history>"+city+"</li>"
searchHistory.innerHTML = cityLog; 

});



searchHistory.addEventListener('click',function(e){
    if (e.target.tagName == 'LI') {
    var city = e.target.innerText;

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+APIkey)
    .then(response => {
        if (response.status === 400 || response.status === 404) {
            throw new Error('Alert');
        }
        return response.json();
    })
    
    .then(function (data) {
          lat = data.coord.lat;
          lon = data.coord.lon;})
    
    .then(async function() {
     fetch('https://api.openweathermap.org/data/3.0/onecall?lat='+lat+'&lon='+lon+'&units=metric&exclude=minutely,hourly,alerts&appid='+APIkey)
    .then(response => {
        if (response.status === 400 || response.status === 404) {
            throw new Error('Alert');
        }
        return response.json();
    })
    .then(function (data) {
        date.innerHTML = new Date(data.current.dt*1000);
        temp.innerHTML = "Temp: "+data.current.temp+"C";
        windSpeed.innerHTML = "Wind: "+data.current.wind_speed+"MPH";
        humid.innerHTML = "Humidity: "+data.current.humidity+" %";
        UV.innerHTML = "UV Index: "+data.current.uvi;
        var days = "";
        for (let i=0; i<data.daily.length;i++)
        {
            days += "<div class=forecasting><p>"+new Date(data.daily[i].dt+1000)+"</p><p>Temp: "+data.daily[i].temp.day+" C</p><p>Wind: "+data.daily[i].wind_speed+" MPH</p><p>Humidity: "+data.daily[i].humidity+" %</p></div>";
    
        }
        forecast.innerHTML=days; 
        })
    })
    
    .catch(err)
    
    }
    
    });
