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