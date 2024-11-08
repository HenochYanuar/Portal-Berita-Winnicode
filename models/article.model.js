const knex = require('knex')
const knexConfig = require('../config/knexfile')

const db = knex(knexConfig.development)


const getAllArticles = async () => {
  try {
    return await db('articles').select()

  } catch (error) {
    throw new Error('Error geting all articles: ' + error.message)

  }
}

module.exports = {
  getAllArticles
}