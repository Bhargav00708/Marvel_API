const path = require('path')
const express = require('express')
require('hbs')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/superHeroID', (req, res) => {
    res.render('superHeroID');
})

app.post('/superHeroID', (req, res) => {
    var axios = require('axios');
    var globalResponse;

    var config = {
        method: 'get',
        url: `http://localhost:3000/marvel.json`,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            globalResponse = response.data.find((value)=>
            {
                return (req.body.ID.toUpperCase() == value.id.toUpperCase())
            })
            res.send(globalResponse);
        })
        .catch(function (error) {
            res.send(error);
        });
})

app.get('/superHeroName', (req, res) => {
    res.render('superHeroName');
})

app.post('/superHeroName', (req, res) => {
    var axios = require('axios');
    var globalResponse;

    var config = {
        method: 'get',
        url: `http://localhost:3000/marvel.json`,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            globalResponse = response.data.find((value)=>
            {
                return (req.body.Name.toUpperCase() == value.name.toUpperCase())
            })
            res.send(globalResponse);
        })
        .catch(function (error) {
            res.send(error);
        });
})

app.get('/superHeroImage', (req, res) => {
    res.render('superHeroImage');
})

app.get('/allSuperHeroNameAndID', (req, res) => {
    var axios = require('axios');

    var config = {
        method: 'get',
        url: `http://localhost:3000/marvel.json`,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            var allNames = response.data.map((value)=>
            {
                return {
                    "Name" : value.name,
                    "ID" : value.id
                }
            })
            res.send(allNames);
        })
        .catch(function (error) {
            res.send(error);
        });
})

app.get('/compare', (req, res) => {
    res.render('superHeroCompare');
})

app.listen(port, () => {
    console.log('Server Is Running On Port ' + port)
})