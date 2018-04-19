const path = require('path')
const exphbs = require('express-handlebars')
require('dotenv').config()

function configure(app) {
  
  app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
  }))
  app.set('view engine', 'hbs')
  app.set('views', path.join(__dirname, 'views'))

}

module.exports = configure
