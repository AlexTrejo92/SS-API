var APIkey = '002b080f4f5ff3c71c662811a4753e10';

var searchCityForm = document.getElementById('cityForm');

var city;

function handleCityFormSubmit(event) {
    event.preventDefault();
    city = document.getElementById('cityInput').value;

    if (!city) {
        window.alert('Please select a city');
        return
    }

    getApi();
}


function getApi(queryURL){
// geoCODING according to documentation to obtain the lat & lon coordinates.
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIkey;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            console.log('GeoCODING response:')
            console.log(data);
            return data;
        })
        // Second API CALL to retrieve 5 day weather forecast
        var latitude = data[0].lat
        var longitude = data[0].lon
        // Function expression same as function secondApiCall(newQueryURL)
        var secondApiCall = function(newQueryURL) {
            
            var newQueryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIkey + '&units=metric&cnt';
        
            fetch(newQueryURL)
                .then(function(secondResponse) {
                    return secondResponse.json();
                })
                .then(function(future){
                    console.log('Second API call (5dayweather) response:')
                    console.log(future);
                })
        }

        printResults();
        secondApiCall();
    }

    function printResults() {
        console.log('PrintResults running!');
        console.log(future.name);
        var chosenCity = future.name
        document.getElementById('chosenCityDisplay').innerText = chosenCity;
        // TODO:Code written to print the city weather data onto the containers and cards
        // var printedCity = document.getElementById('chosenCityDisplay');
        // printedCity.innerText('SELECTED CITY PRINTED CORRECTLY');
        }
// fetch(queryURL);

// var state;

// var country;


/* Code to add an event listener to the search btn click so that it stores
the user input to the local storage and triggers the retrieveal of data from
the API weather app */

// var searchBtn = document.querySelector('#srchBtn');
// console.log(searchBtn);



/* This function will make the call to the API to retrieve the data and will
print the results on the different DOM Elements */

// function retrieveCityData() {
//     console.log('You clicked search button!')
//     var userInput = document.querySelector('.cityInput').value;
//     console.log(userInput);
//     localStorage.setItem('City', userInput);
// }

searchCityForm.addEventListener('submit', handleCityFormSubmit);

// getApi();
// cityInput();