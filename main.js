var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var unit = "C";
var celsius;

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      getCurrentWeather(lat, lon);
    });
  } else {
    alert("This browser doesn't support geolocation.");
  }

  $("#unit").click(function() {
    var currentUnit = $("#unit").html();
    var newUnit = currentUnit;

    if (newUnit === "C") {
      newUnit = "F";
    } else if (newUnit === "F") {
      newUnit = "C";
    }
    $("#unit").html(newUnit);
    if (newUnit == "F") {
      var fah = Math.round(parseInt($("#temperature").html()) * 9 / 5 + 32);
      $("#temperature").html(fah + " " + String.fromCharCode(176));
    } else {
      $("#temperature").html(celsius + " " + String.fromCharCode(176));
    }
  });
});

function getCurrentWeather(lat, lon) {
  var url = api + "lat=" + lat + "&" + "lon=" + lon;
  $.ajax({
    url: url,
    success: function(data) {
      $("#location").html(data.name + ", ");
      $("#country").html(data.sys.country);
      celsius = Math.round(data.main.temp * 10) / 10;
      $("#temperature").html(celsius + " " + String.fromCharCode(176));
      $("#unit").html(unit);
      $("#description").html(data.weather[0].main);
      $("#humidity").html(data.main.humidity);
      $("#windSpeed").html(data.wind.speed);
      $("#windDirec").html(degToDirection(data.wind.deg));
      $("#icon").html('<img src="' + data.weather[0].icon + '">');
    }
  });

  function degToDirection(degrees) {
    switch (true) {
      case degrees > 337.5:
        return "N";
        break;
      case degrees > 292.5:
        return "NW";
        break;
      case degrees > 247.5:
        return "W";
        break;
      case degrees > 202.5:
        return "SW";
        break;
      case degrees > 157.5:
        return "S";
        break;
      case degrees > 122.5:
        return "SE";
        break;
      case degrees > 67.5:
        return "E";
        break;
      case degrees > 22.5:
        return "NE";
        break;
      default:
        return "N";
    }
  }
}
