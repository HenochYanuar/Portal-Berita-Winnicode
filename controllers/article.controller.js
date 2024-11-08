const articleModel = require('../models/article.model')
const moment = require('moment')
const { err500, err404 } = require('../utils/error')

const layout = 'layout/index'


const getAllArticles = async (req, res) => {
  try {
    const articles = await articleModel.getAllArticles()

    const articlesWithTimeDiff = articles.map(article => {
      const updatedAt = moment(article.updated_at)
      const now = moment()

      const diffInHours = now.diff(updatedAt, 'hours')
      let timeDifferenceText

      if (diffInHours >= 1) {
        timeDifferenceText = `${diffInHours} jam yang lalu`
      } else {
        const diffInMinutes = now.diff(updatedAt, 'minutes')
        timeDifferenceText = `${diffInMinutes} menit yang lalu`
      }

      return {
        ...article,
        timeDifference: timeDifferenceText
      }
    })

    const context = {
      articles: articlesWithTimeDiff
    }

    const title = 'Articles Dashboard'

    res.status(200).render('dashboard/index', { context, title, layout })
  } catch (error) {
    console.error('Error in getAllArticles:', error)
    res.status(500).render('error/error', err500)
  }
}

module.exports = {
  getAllArticles
}