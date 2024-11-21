const express = require('express')
const authenticateJWT = require('../middleware/authMiddleware')
const profileController = require('../controllers/profile.controller')

const profileRouter = express.Router()

profileRouter.use(authenticateJWT)

profileRouter.get('/profile/:id', profileController.getUserProfile)

module.exports = {
  profileRouter
}