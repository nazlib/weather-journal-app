/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&zip=';
const apiKey = '&appid=8024c2d567c0ceec90295e597e40771d';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', fnGenerate);

function fnGenerate() {
    var zipcode = document.getElementById('zip').value;
    var feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zipcode, apiKey)
        .then(function (data) {
            console.log(data);
            var weatherData = {
                temp: data.main.temp,
                date: newDate,
                content: feelings
            };
            postData('http://localhost:8000/add', weatherData)
        })
        .then(function () {
            updateUI()
        }
        );
}
const getWeather = async (baseURL, zipcode, key) => {

    const res = await fetch(baseURL + zipcode+",tr" + key)
    try {

        const data = await res.json();
        console.log(data)
        return data;
    }
    catch (error) {
        console.log("error", error);
    }
}
// Async POST
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {

        console.log("I am here");
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log("error", error);
    }
};
const updateUI = async () => {
    const req = await fetch('http://localhost:8000/get');
    try {
        const allData = await req.json();
        document.getElementById('temp').innerHTML =`temperature: ${allData.temp}`;
        document.getElementById('date').innerHTML =`date: ${allData.date}`;
        document.getElementById('content').innerHTML = `feelings: ${allData.content}`;
    }
    catch (error) {
        console.log("error", error);
    }
}