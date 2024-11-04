const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const path = require('path')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

const port = 8000

const server = express()

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'view'))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, 'public')))

server.use(methodOverride('_method'))

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())


server.use(expressLayouts)

server.listen(port, () => console.log(`Server is running at http://localhost:${port}`))