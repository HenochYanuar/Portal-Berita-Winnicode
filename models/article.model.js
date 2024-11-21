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

const getAllArticlesByQuery = async (query) => {
  try {
    const articles = await db('articles')
      .select(
        'articles.*',
        'tags.tag as tag_name',
        db('comments')
          .count('*')
          .whereRaw('comments.article_id = articles.id')
          .as('comment_count')
      )
      .leftJoin('tags', 'articles.tags_id', 'tags.id')
      .where(function () {
        this.where('articles.title', 'like', `%${query}%`)
          .orWhere('articles.content', 'like', `%${query}%`)
          .orWhere('articles.category', 'like', `%${query}%`)
          .orWhere('tags.tag', 'like', `%${query}%`);
      });
    return articles;

  } catch (error) {
    throw new Error('Error geting all articles by query: ' + error.message)
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
  getAllArticles, getOne, getAllArticlesByQuery
}