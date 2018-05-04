'use strict'
const rp = require('request-promise')

const apiKey = process.env.ACCUWEATHER_API_KEY
const baseUrl = process.env.ACCUWEATHER_API_URL

const imageUrlBase='https://developer.accuweather.com/sites/default/files/'
const imageUrlTail='-s.png'

function formatDate(dateLiteral) {
  let d = new Date(dateLiteral)
  let oneBasedMonth = d.getMonth()+1
  let dateArray = [
    `${d.getFullYear()}`,
    d.getMonth() < 10 ? `0${oneBasedMonth}`: `${oneBasedMonth}`,
    d.getDate() < 10 ?`0${d.getDate()}`: `${d.getDate()}`
  ]
  return `${dateArray[0]}\-${dateArray[1]}\-${dateArray[2]}`
}

function normalizeInteger(intLiteral){
  return intLiteral < 10 ? `0${intLiteral}` : `${intLiteral}`
}

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
      // getKey(city)
      // .then(getForecast)
      // .then((forecast) => {
      //   res.render('../forecast/city',getDisplayForecast(forecast, city))
      // })
      // .catch(handleError)
      res.render('../forecast/city',getDisplayForecast(getDemoForecast(),city))

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
  var displayForecast = {}
  try {
    displayForecast.headlinetext = rawForecast.Headline.Text
    displayForecast.link = rawForecast.DailyForecasts.link
    displayForecast.effectiveDate = formatDate(rawForecast.Headline.EffectiveDate)
  if ( rawForecast.DailyForecasts.length >1 )
    throw new Error ("Unexpected forecast format")

  displayForecast.requestCity = city

  displayForecast.high = rawForecast.DailyForecasts[0].Temperature.Maximum.Value
  displayForecast.highunit = rawForecast.DailyForecasts[0].Temperature.Maximum.Unit
  displayForecast.low = rawForecast.DailyForecasts[0].Temperature.Minimum.Value
  displayForecast.lowunit = rawForecast.DailyForecasts[0].Temperature.Minimum.Unit


  displayForecast.dayImage=`${imageUrlBase}${normalizeInteger(rawForecast.DailyForecasts[0].Day.Icon)}${imageUrlTail}`
  displayForecast.dayText=rawForecast.DailyForecasts[0].Day.IconPhrase
  displayForecast.nightImage=`${imageUrlBase}${normalizeInteger(rawForecast.DailyForecasts[0].Night.Icon)}${imageUrlTail}`
  displayForecast.nightText=rawForecast.DailyForecasts[0].Night.IconPhrase

}
catch (err){
  console.log(err)
}

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

function getDemoForecast(){
  return({
  "Headline": {
    "EffectiveDate": "2018-05-05T08:00:00-05:00",
    "EffectiveEpochDate": 1525525200,
    "Severity": 4,
    "Text": "Pleasant tomorrow",
    "Category": null,
    "EndDate": null,
    "EndEpochDate": null,
    "MobileLink": "http://m.accuweather.com/en/us/chicago-il/60608/extended-weather-forecast/348308?lang=en-us",
    "Link": "http://www.accuweather.com/en/us/chicago-il/60608/daily-weather-forecast/348308?lang=en-us"
  },
  "DailyForecasts": [{
    "Date": "2018-05-04T07:00:00-05:00",
    "EpochDate": 1525435200,
    "Temperature": {
      "Minimum": {
        "Value": 55.0,
        "Unit": "F",
        "UnitType": 18
      },
      "Maximum": {
        "Value": 72.0,
        "Unit": "F",
        "UnitType": 18
      }
    },
    "Day": {
      "Icon": 4,
      "IconPhrase": "Intermittent clouds"
    },
    "Night": {
      "Icon": 34,
      "IconPhrase": "Mostly clear"
    },
    "Sources": ["AccuWeather"],
    "MobileLink": "http://m.accuweather.com/en/us/chicago-il/60608/daily-weather-forecast/348308?day=1&lang=en-us",
    "Link": "http://www.accuweather.com/en/us/chicago-il/60608/daily-weather-forecast/348308?day=1&lang=en-us"
  }]
})
}

module.exports = initForecast
