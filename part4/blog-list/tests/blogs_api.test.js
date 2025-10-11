const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

///
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

///
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

///
test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

///
test('blogs are return with property id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(blog => {
    assert(blog.id)
  });
})

///
test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Test title",
    author: "Test author",
    url: "https://test.com/",
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  assert(contents.includes('Test title'))
})

///
test('blogs sent without property likes, default to 0', async () => {
  const newBlog = {
    title: "Test title",
    author: "Test author",
    url: "https://test.com/",
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const addedBlog = response.body

  console.log("addedBlog: ", addedBlog)
  assert.strictEqual(addedBlog.likes, 0)
})

///
test('blogs sent without property title, return error 404', async () => {
  const newBlog = {
    author: "Test author",
    url: "https://test.com/",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

///
test('blogs sent without property url, return error 404', async () => {
  const newBlog = {
    title: "Test title",
    author: "Test author",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

///
test('a blog with valid id can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  console.log("blogsAtEnd: ",blogsAtEnd)
  console.log("blogToDelete: ", blogToDelete)

  assert(!blogsAtEnd.includes(blogToDelete))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('a blog with invalid id cant be deleted', async () => {
  await api
    .delete(`/api/blogs/12`)
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})