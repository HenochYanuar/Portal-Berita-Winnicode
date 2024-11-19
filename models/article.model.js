const knex = require('knex')
const knexConfig = require('../config/knexfile')

const db = knex(knexConfig.development)


const getAllArticles = async () => {
  try {
    const articles = await db('articles')
      .select(
        'articles.*',
        db('comments')
          .count('*')
          .whereRaw('comments.article_id = articles.id')
          .as('comment_count')
      )
    return articles
    
  } catch (error) {
    throw new Error('Error geting all articles: ' + error.message)

  }
}

const getOne = async (id) => {
  try {
    return await db('articles').where({ id }).first()

  } catch (error) {
    throw new Error('Error geting a article by id:' + error.message)

  }
}

module.exports = {
  getAllArticles, getOne
}