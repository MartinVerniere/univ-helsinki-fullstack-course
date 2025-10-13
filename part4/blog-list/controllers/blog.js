const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, url: 1, likes: 1 })
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

  if (!request.token) return response.status(400).json({ error: 'No token sent on request' })

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) { return response.status(400).json({ error: 'No users exist to assign to new blog' }) }

  if (!body.url || !body.title) { response.status(400).json(request) }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  if (!request.token) return response.status(400).json({ error: 'No token sent on request' })

  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) { return response.status(400).json({ error: 'Blog doesnt exist' }) }
  const blogCreatorId = blogToDelete.user.toString()

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) { return response.status(401).json({ error: 'token invalid' }) }
  const user = await User.findById(decodedToken.id)

  if (blogCreatorId !== user.id.toString()) { return response.status(401).json({ error: 'Not authorized to delete this blog' }) }

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