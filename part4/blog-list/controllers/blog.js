const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.url || !body.title) {
    response.status(400).json(request)
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { title, author, url, likes } = request.body

  console.log("id: ", id);

  const blogToUpdate = await Blog.findById(id)

  if (!blogToUpdate) return response.status(404).end()

  blogToUpdate.title = title || blogToUpdate.title
  blogToUpdate.author = author || blogToUpdate.author
  blogToUpdate.url = url || blogToUpdate.url
  blogToUpdate.likes = likes || blogToUpdate.likes

  await blogToUpdate.save()

  response.status(204).end()
})

module.exports = blogsRouter