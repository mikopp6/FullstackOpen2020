const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

console.log('in testing')

router.post('/reset', async (request, response) => {
  console.log('in testing router post')
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router