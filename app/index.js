const configure = require('./configure')
const express = require('express')
const bodyparser = require('body-parser')
const app = express()

configure(app)

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

require('./forecast').init(app)
console.log(`BaseURL: ${process.env.ACCUWEATHER_API_URL}`)
app.get('/', (req, res) => {
  res.render('index', {

  })
})
module.exports = app
