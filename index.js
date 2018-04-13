const port = 3000
var index = require('./app/index'),
    configure = require('./app/configure'),
    express = require('express'),
    bodyparser = require('body-parser'),
    app = express()

configure(app)

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(index)
app.listen(port, (err) =>{
  if(err){
    return err
  }
  console.log("Server listening on port " + port)
  console.log(`BaseURL: ${process.env.ACCUWEATHER_API_URL}`)
})
