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
      const diffInDays = now.diff(updatedAt, 'days')
      const diffInWeeks = now.diff(updatedAt, 'weeks')
      const diffInMonth = now.diff(updatedAt, 'months')
      const diffInYears = now.diff(updatedAt, 'years')

      let timeDifferenceText

      if (diffInYears >= 1) {
        timeDifferenceText = `${diffInYears} tahun yang lalu`
      }if (diffInMonth >= 1) {
        timeDifferenceText = `${diffInMonth} bulan yang lalu`
      } else if (diffInWeeks >= 1) {
        timeDifferenceText = `${diffInWeeks} minggu yang lalu`
      } else if (diffInDays >= 1) {
        timeDifferenceText = `${diffInDays} hari yang lalu`
      } else if (diffInHours >= 1) {
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