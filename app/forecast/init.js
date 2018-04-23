'use strict'
const rp = require('request-promise')

const apiKey = process.env.ACCUWEATHER_API_KEY
const baseUrl = process.env.ACCUWEATHER_API_URL

function initForecast(app) {
  app.get('/forecast', (req,res,next) => {
    try {
      if (! (baseUrl && apiKey)) {
        res.status(500)
        throw new Error('not all values set')
      }
      var city = req.query.cityName
      if(! city) {
        res.status(422)
        throw new Error("must specify city to search")
      }
      getKey(city)
      .then(getForecast)
      .then((forecast) => {
        res.render('../forecast/city',getDisplayForecast(forecast, city))
      })
      .catch(handleError)

    }
    catch(error) {
      res.render('error', {statuscode: res.statusCode, message:error.message})
    }
  })
}

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
  if(result && result.length > 0){
    var key = result[0].Key
    return rp({
      uri: baseUrl+'/forecasts/v1/daily/1day/'+key,
      qs: {
        apikey: apiKey
      },
      json: true
    })
  } else {
    next(new Error(`Error getting forecast for result ${result}.`))
  }
}

function getDisplayForecast(rawForecast, city){
  var displayForecast = rawForecast
  displayForecast.requestCity = city

  return displayForecast
}

function handleError(err, req, res, next){
  console.error(err)
  if(res.get('status') >= 400 && res.get('status') <=500){
    res.render('error', err)
  }
  else {
    res.render('error',
      {message: 'Something has gone wrong getting the information you requested'})
  }
}

module.exports = initForecast
