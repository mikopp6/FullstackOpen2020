const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

  await User.deleteMany({})
  await api
    .post('/api/users')
    .send({ username: 'root', name: 'Sys Admin', password: 'hunter1' })
})

describe('blog tests', () => {

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
    const users = await api
      .get('/api/users')
    const testUserId = users.body[0].id
    const getLoginToken = await api
      .post('/api/login')
      .send({ username: 'root', password: 'hunter1' })
    const testToken = getLoginToken.body.token

    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
      userId: testUserId
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${testToken}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const title = blogsAtEnd.map(r => r.title)
    expect(title).toContain('Canonical string reduction')
  
  })
  
  test('blog with likes missing defaults it to 0', async () => {
    const users = await api
      .get('/api/users')
    const testUserId = users.body[0].id
    const getLoginToken = await api
      .post('/api/login')
      .send({ username: 'root', password: 'hunter1' })
    const testToken = getLoginToken.body.token

    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      __v: 0,
      userId: testUserId
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${testToken}`)
      .send(newBlog)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    const addedBlog = blogsAtEnd[2]
    expect(addedBlog.likes).toEqual(0)
  
  })
  
  test('blog with title and url missing fails', async () => {
    const users = await api
      .get('/api/users')
    const testUserId = users.body[0].id
    const getLoginToken = await api
      .post('/api/login')
      .send({ username: 'root', password: 'hunter1' })
    const testToken = getLoginToken.body.token

    const newBlog = {
      author: 'Edsger W. Dijkstra',
      likes: 12,
      __v: 0,
      userId: testUserId
    }
  
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${testToken}`)
      .send(newBlog)
      .expect(400)
  })
  
  test('deleting blog', async () => {
    const users = await api
      .get('/api/users')
    const testUserId = users.body[0].id

    const getLoginToken = await api
      .post('/api/login')
      .send({ username: 'root', password: 'hunter1' })
    const testToken = getLoginToken.body.token

    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
      userId: testUserId
    }

    console.log(testToken)

    const savedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${testToken}`)
      .send(newBlog)

    await api
      .delete(`/api/blogs/${savedBlog.body.id}`)
      .set('Authorization', `bearer ${testToken}`)
      .expect(204)
  })

  test('missing token fails', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
      userId: '5f16e3acdec6e835f013b86f'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ')
      .send(newBlog)
      .expect(401)
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
      .expect(200)
  })
})


describe('user tests', () => {
  test('users json return', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('creating new user succeeds', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'miko123',
      name: 'Miko Palojärvi',
      password: 'correcthorsebatterystaple'
    }
    
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })
  
  test('non-unique username fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'admin123',
      password: 'pw1234'
    }
    
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)  
  })

  test('missing pw fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '123test',
      name: 'admin123'
    }
    
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)  
  })

  test('too short username fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '12',
      name: 'admin123',
      password: 'salasana'
    }
    
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('shorter than the minimum allowed length')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)  
  })

  test('too short password fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '123testi',
      name: 'admin123',
      password: 'kk'
    }
    
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)  
  })
})

afterAll(() => {
  mongoose.connection.close()
})