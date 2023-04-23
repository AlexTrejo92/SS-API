var APIkey = '002b080f4f5ff3c71c662811a4753e10';

var searchCityForm = document.getElementById('cityForm');

var city;

var searchHistory = localStorage.getItem('historicData') || [] 

// Function to create a button, give it a value, and append it to the parent container.
// function 

// This function is the first to trigger all the other functions with APIs
function handleCityFormSubmit(event) {
    event.preventDefault();
    city = document.getElementById('cityInput').value;
    // TODO: Call function to add city to the buttons
    // searchHistory.push(city)
    // localStorage.setItem('historicData', searchHistory);

    if (!city) {
        window.alert('Please select a city');
        return
    }

    var mainContent = document.querySelector('.display');

    mainContent.classList.remove('hidden');

    getAPI();
}

/* This function makes the calls to the API to retrieve the data and
prints the results on the different DOM Elements */

function getAPI(){
// geoCODING according to documentation to obtain the lat & lon coordinates.
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIkey;

    //TODO: In the fetch code there should be an emergency input in case the server is not working or the user chose an invalid city.
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log('GeoCODING response:')
            console.log(data);
            var latitude = data[0].lat
            var longitude = data[0].lon
            console.log(latitude, longitude)
            secondApiCall(latitude, longitude);
        })
}

// Function expression same as function secondApiCall(currentcastURL)
// Second API CALL to retrieve current weather stats
function secondApiCall(latitude, longitude) {
                
    var currentcastURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIkey + '&units=metric';
            
    fetch(currentcastURL)
    .then(function(secondResponse) {
    return secondResponse.json();
    })
    .then(function(currentWeather){
        console.log('Second API call (currentWeather) response:')
        console.log(currentWeather);
        // Third API call to retrieve 5 day forecast
        thirdApiCall(latitude, longitude);
        printToday(currentWeather);
    })
}


var todaysDate = dayjs().format('MM/DD/YYYY');

// Function to print Current Weather at selected city and first container
function printToday(todayWeather) {
    var chosenCity = todayWeather.name;
    var ccTemp = todayWeather.main.temp;
    var ccWind = todayWeather.wind.speed;
    var ccHumidity = todayWeather.main.humidity;
    var ccIcon = todayWeather.weather[0].icon;
    console.log(ccIcon);
    var todaysIconURL = 'http://openweathermap.org/img/w/' + ccIcon + '.png'
    document.getElementById('chosenCityDisplay').innerText = chosenCity + '  (' + todaysDate + ')';
    var SOMETHING = document.getElementById('todayWicon');
    SOMETHING.setAttribute('src', todaysIconURL); 
    document.getElementById('ccTemp').innerText = 'Temp: ' + ccTemp + '°C';
    document.getElementById('ccWind').innerText = 'Wind: ' + ccWind + ' m/sec';
    document.getElementById('ccHumidity').innerText = 'Humidity: ' + ccHumidity + '%';
    }    

// Last API Call to get 5 day forecast
function thirdApiCall(latitude, longitude) {
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIkey + '&units=metric'
                    
    fetch(forecastURL)
    .then(function(thirdResponse){
    return thirdResponse.json();
    })
    .then(function(futureWeather){
    console.log('Third API call (forecast) response:')
    console.log(futureWeather);
    printForecast(futureWeather);
    // printMainResults(futureWeather);
    })
}
    // TODO: Write code to print the city weather data onto the containers and cards    
function printForecast(fiveDayForecastWeather) {
// var counter = 7;
// var forecast = fiveDayForecastWeather.list[counter]
// TODO: Loop to go through the futureWeather data, retrieve it and then print it on each card available.
var cardContainer = document.querySelectorAll('.card');
var iconContainer = document.getElementById('icon');
console.log(cardContainer);
var counter = 7;
for (let i = 0; i < cardContainer.length; i++) {
    var forecast = fiveDayForecastWeather.list[counter]
    var iconcode = fiveDayForecastWeather.list[counter].weather[0].icon
    console.log(iconcode);
    var iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png"
    // var weatherIcon = fiveDayForecastWeather.list[counter].weather[0].icon;
    cardContainer[i].children[0].innerText = dayjs(forecast.dt_txt).format('MM/DD/YYYY');
// This adds the icon according to the weather.
    cardContainer[i].children[1].setAttribute('src', iconUrl);
// These lines print on screen the temp, wind and humidity.
    cardContainer[i].children[2].innerText = 'Temp: ' + forecast.main.temp + '°C';
    cardContainer[i].children[3].innerText = 'Wind: ' + forecast.wind.speed + ' m/sec';
    cardContainer[i].children[4].innerText = 'Humidity: ' + forecast.main.humidity + '%';
    counter = counter+7;
}


// $('#forecastCard').each((singleCard)=> {
//     console.log(singleCard)
//     singleCard.children('.temp').text('test');
// })

}



    // TODO: Convert the UNIX value into a date to be printed
    // function convertUnix(){
    //     var unixTimestamp = currentWeather.dt;
    //     console.log(unixTimestamp);
    //     var currentDate = new Date(unixTimestamp * 1000);
    //     console.log(currentDate);
    //     return currentDate;
    // }

    // convertUnix();

/*TODO: Code to add an event listener to the search btn click so that it stores
the user input to the local storage and creates an historic button below the search bar*/

// function retrieveCityData() {
//     console.log('You clicked search button!')
//     var userInput = document.querySelector('.cityInput').value;
//     console.log(userInput);
//     localStorage.setItem('City', userInput);
// }

// TODO: Install an API for Icons so that when an specific weather is detected, the appropiate icon is printed on screen on the cards and on main display.

// Even listener to trigger the APP functionality
searchCityForm.addEventListener('submit', handleCityFormSubmit);