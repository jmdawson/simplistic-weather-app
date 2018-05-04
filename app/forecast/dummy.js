class DummyData {
  static getOneDayForecast(){
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
}
 module.exports = DemoData
