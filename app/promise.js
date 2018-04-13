const path = require('path')
const express = require('express')
const rp = require('request-promise')
const exphbs = require('express-handlebars')

const app = express()

const apiKey = process.env.ACCUWEATHER_API_KEY
const baseUrl = process.env.ACCUWEATHER_API_URL


app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: 'app/views/layouts'
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/:city', (req,res) => {
  var city = req.params.city
  var displayForecast
  getKey(city)
  .then(getForecast)
  .then((forecast) => {
    console.log(forecast)
    forecast.requestCity = city
    res.render('index',forecast)
  })
  .catch((err) => {
    console.log(err.error)
    res.render('error', err)
  })

})

app.listen(3000)

function getKey(searchString){
  return rp({
    uri: baseUrl+'/locations/v1/cities/search',
    qs: {
      q: searchString,
      apikey: apiKey
    },
    json: true
  })

}

function getForecast(result){
  var key = result[0].Key
  console.log("Key: " + key)
  return rp({
    uri: baseUrl+'/forecasts/v1/daily/1day/'+key,
    qs: {
      apikey: apiKey
    },
    json: true
  })
}

function getDisplayForecast(rawForecast){
  var displayForecast = {}

  return displayForecast
}
