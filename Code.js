var weathers = [];
var maintemperature = document.querySelector(".temperature")
var mainlocation = document.querySelector(".location")
var mainhumidity = document.querySelector(".humidity")
var mainwind = document.querySelector(".wind")
var mainuvindex = document.querySelector(".uvindex")

var date1 = document.querySelector(".date1")
var temp1 = document.querySelector(".temp1")
var hum1 = document.querySelector(".hum1")

var date2 = document.querySelector(".date2")
var temp2 = document.querySelector(".temp2")
var hum2 = document.querySelector(".hum2")

var date3 = document.querySelector(".date3")
var temp3 = document.querySelector(".temp3")
var hum3 = document.querySelector(".hum3")

var date4 = document.querySelector(".date4")
var temp4 = document.querySelector(".temp4")
var hum4 = document.querySelector(".hum4")

var date5 = document.querySelector(".date5")
var temp5 = document.querySelector(".temp5")
var hum5 = document.querySelector(".hum5")



// $(maintemperature).append(" Appended text");
// $(mainlocation).append(" Appended text");
// $(mainhumidity).append(" Appended text");
// $(mainwind).append(" Appended text");
// $(mainuvindex).append(" Appended text");

// $(date1).append(" 9/99/9999");
// $(temp1).append(` 99.99 "F"`);
// $(hum1).append(" 99%");

// $(date2).append("9/99/9999");
// $(temp2).append(`99.99 "F"`);
// $(hum2).append("99%");

// $(date3).append("9/99/9999");
// $(temp3).append(`99.99 "F"`);
// $(hum3).append("99%");

// $(date4).append("9/99/9999");
// $(temp4).append(`99.99 "F"`);
// $(hum4).append("99%");

// $(date5).append("9/99/9999");
// $(temp5).append(`99.99 "F"`);
// $(hum5).append("99%");



function displayWeatherInfo(){    
  var weather = $(this).attr("data-name");

  // other api key
  var APIKey = "166a433c57516f51dfab1f7edaed8413";

  // my api key
  // var APIKey = "513fc90bd741df712ec9a2ee8086222d";


  var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" + weather + ",Burundi&units=imperial&appid=" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    console.log(response);

    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    $(maintemperature).text("Temperature (Kelvin) " + tempF);

    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + response.main.temp);
    
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    getuvindex(APIKey, lat, lon)
    getfiveday(weather)
    

    $(maintemperature).empty();
    $(mainlocation).empty();
    $(mainhumidity).empty();
    $(mainwind).empty();
    $(date1).empty();
    $(temp1).empty();
    $(hum1).empty();
    $(date2).empty();
    $(temp2).empty();
    $(hum2).empty();
    $(date3).empty();
    $(temp3).empty();
    $(hum3).empty();
    $(date4).empty();
    $(temp4).empty();
    $(hum4).empty();
    $(date5).empty();
    $(temp5).empty();
    $(hum5).empty();

    $(maintemperature).append(response.main.temp + "F");
    $(mainlocation).append(response.name);
    $(mainhumidity).append(response.main.humidity);
    $(mainwind).append(response.wind.speed);
  })
}

function getuvindex(APIKey, lat, lon){

var APIKey = "166a433c57516f51dfab1f7edaed8413";

var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
$.ajax({
  url: queryURL,
  method: "GET"
})
.then(function(response){
  $(mainuvindex).empty();
  $(mainuvindex).append(response.value);
})
}

function getfiveday(weather){

  
  var APIKey = "166a433c57516f51dfab1f7edaed8413";

  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + weather + ",us&mode=xml=imperial&appid=" + APIKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response){
    console.log(response);
    var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
    $(temp1).text(tempF.toFixed(2));
    var tempF = (response.list[1].main.temp - 273.15) * 1.80 + 32;
    $(temp2).text(tempF.toFixed(2));
    var tempF = (response.list[2].main.temp - 273.15) * 1.80 + 32;
    $(temp3).text(tempF.toFixed(2));
    var tempF = (response.list[3].main.temp - 273.15) * 1.80 + 32;
    $(temp4).text(tempF.toFixed(2));
    var tempF = (response.list[4].main.temp - 273.15) * 1.80 + 32;
    $(temp5).text(tempF.toFixed(2));
    
    $(date1).append("1 day from now");
    $(temp1).append(response.list[0].main.temp + " F");
    $(hum1).append(response.list[0].main.humidity);

    $(date2).append("2 days from now");
    $(temp2).append(response.list[1].main.temp + " F");
    $(hum2).append(response.list[1].main.humidity);

    $(date3).append("3 days from now");
    $(temp3).append(response.list[2].main.temp + " F");
    $(hum3).append(response.list[2].main.humidity);

    $(date4).append("4 days from now");
    $(temp4).append(response.list[3].main.temp + " F");
    $(hum4).append(response.list[3].main.humidity);

    $(date5).append("5 days from now");
    $(temp5).append(response.list[4].main.temp + " F");
    $(hum5).append(response.list[4].main.humidity);
  })
  }


function renderButtons() {
  $(".populateButtons").empty();

  for (var i = 0; i < weathers.length; i++) {
    var br = $("<br>")
    var a = $("<button>");
    a.addClass("weather-btn");
    a.attr("data-name", weathers[i]);
    a.text(weathers[i]);
    $(".populateButtons").append(a);
    $(".populateButtons").append(br)
  }
}
$("#search").on("click", function(event) {
  event.preventDefault();
  var weather = $("#weather-input").val().trim();
  weathers.push(weather)
  renderButtons();
});

$(document).on("click", ".weather-btn", displayWeatherInfo);

renderButtons();