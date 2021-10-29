const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
var citiesTemperatures = null;

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Read the file with the temperatures for the cities
fs.readFile("./public/cities.json", (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }

    try {
        citiesTemperatures = JSON.parse(jsonString);
        console.log("City temperatures are:", citiesTemperatures);
    } catch (err) {
        console.log("Error parsing JSON string:", err);
    }
});

app.post('/weather', (req, res) => {
    var selectedCity = req.body.cities
    console.log(selectedCity);

    var temperature = citiesTemperatures.find(x => x.name === selectedCity).temperature;
    console.log('The temperature in ' + selectedCity + ' is ' + temperature);

    res.set('Content-Type', 'text/html');
    res.send('<h1> Temperature results <p>The temperature in ' + selectedCity + ' is ' + temperature + '</p></h1>');


});

app.get('/', (req, res) => {
    res.sendStatus(200);
})

app.get('/weather', (req, res) => {
    res.sendFile('./weather.html', { root: __dirname });
});

// Server setup
app.listen(port, () => {
    console.log("Server is running");
});


