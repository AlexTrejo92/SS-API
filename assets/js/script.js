var APIkey = '002b080f4f5ff3c71c662811a4753e10';

var city;



function cityInput() {
    city = document.querySelector('cityInput').innerHTML;
    console.log(city);
}

/* Code to add an event listener to the search btn click so that it stores
the user input to the local storage and triggers the retrieveal of data from
the API weather app */

var searchBtn = document.querySelector('#srchBtn');
console.log(searchBtn);

searchBtn.addEventListener('click', retrieveCityData);

/* This function will make the call to the API to retrieve the data and will
print the results on the different DOM Elements */

function retrieveCityData() {
    console.log('You clicked search button!')
    var userInput = document.querySelector('.cityInput').value;
    console.log(userInput);
    localStorage.setItem('City', userInput);
}
