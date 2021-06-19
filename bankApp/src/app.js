const express = require('express')
const path = require('path')
const hbs = require('hbs')
const session = require('express-session')
const bankRoutes = require('../routes/bank.routes')
const exp = require('constants')
const app = express()

app.set('view engine','hbs')
app.use(express.static(path.join(__dirname,'../public')))
app.set('views',path.join(__dirname, '../frontend/views'))
hbs.registerPartials(path.join(__dirname,'../frontend/layouts'))
app.use(express.urlencoded())
app.use(session({secret:'abc'}))


app.use(bankRoutes)


module.exports = app