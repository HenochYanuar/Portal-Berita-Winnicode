const knex = require('knex')
const knexConfig = require('../config/knexfile')

const db = knex(knexConfig.development)

const getOne = async (article_id) => {
  try {
    return await db('comments')
    .select(
      'comments.id',
      'comments.content',
      'comments.user_id',
      'comments.article_id',
      'comments.parent_id',
      'comments.created_at',
      'comments.updated_at',
      'users.username'
    )
    .leftJoin('users', 'comments.user_id', 'users.id')
    .where('comments.article_id', article_id)
    .orderBy('comments.created_at', 'desc')

  } catch (error) {
    console.error(error.message)
    throw new Error('Error geting a comments by article id' + error.message)

  }
}

const create = async (data) => {
  try {
    return await db('comments').insert(data)

  } catch (error) {
    throw new Error('Error failed posts the comment' + error.message)

  }
}

module.exports = {
  getOne, create
}