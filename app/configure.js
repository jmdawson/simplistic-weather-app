const path = require('path')
const exphbs = require('express-handlebars')
require('dotenv').config()

function configure(app) {
  console.log(__dirname)
  console.log(path.join(__dirname, 'views/layouts'))

  app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
  }))
  app.set('view engine', 'hbs')
  app.set('views', path.join(__dirname, 'views'))

}

module.exports = configure
