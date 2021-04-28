
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, ()=> {
    console.log(`running on localhost: ${port}`);
});

// GET route
app.get('/get', getData);

function getData(request, response) {
    response.send(projectData);
};
// POST route
app.post('/add', fnAddData);

function fnAddData(req, res) {
    var weatherData = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content
    }
    projectData = weatherData;
    res.send(projectData);
}