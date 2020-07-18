const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs json return', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier is named id', async () => {
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[0].id).toBeDefined()
})

test('adding valid blog', async () => {
  const newBlog = {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const title = blogsAtEnd.map(r => r.title)
  expect(title).toContain('Canonical string reduction')

})

test('blog with likes missing defaults it to 0', async () => {
  const newBlog = {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const blogsAtEnd = await helper.blogsInDb()

  const addedBlog = blogsAtEnd[2]
  expect(addedBlog.likes).toEqual(0)

})

test('blog with title and url missing fails', async () => {
  const newBlog = {
    _id: '5a422b3a1b54a676234d17f9',
    author: 'Edsger W. Dijkstra',
    likes: 12,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('deleting blog', async () => {
  await api
    .delete('/api/blogs/5a422aa71b54a676234d17f8')
    .expect(204)
})

test('updating blog', async () => {
  const updatedBlog = {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 6,
    __v: 0
  }

  await api
    .put('/api/blogs/5a422aa71b54a676234d17f8')
    .send(updatedBlog)
    .expect(204)
})

afterAll(() => {
  mongoose.connection.close()
})