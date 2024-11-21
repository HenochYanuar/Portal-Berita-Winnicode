const userModel = require('../models/user.model')
const commentModel = require('../models/comment.model')
const { err500, err404 } = require('../utils/error')
const layout = 'layout/index'

const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findByEmail(req.user.email)
    const comments = await commentModel.getUserComments(user.id)

    // console.log(comments)
    // return

    if (!user) {
      return res.status(404).render('error/error', err404)
    }

    context = {
      user, comments
    }

    const title = 'User Profile'

    return res.status(200).render('profile/index', { context, title, layout })

  } catch (error) {
    console.error('Error in dashboard:', error)
    res.status(500).render('error/error', err500)
  }
}

module.exports = {
  getUserProfile
}