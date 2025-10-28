import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		createBlog(state, action) {
			state.push(action.payload)
		},
		setBlogs(state, action) {
			const orderedBlogs = action.payload.sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
			return orderedBlogs
		},
		voteBlog(state, action) {
			const blogId = action.payload.id
			const blogToChange = state.find(blog => blog.id === blogId)
			const newBlog = { ...blogToChange, likes: blogToChange.likes + 1 }
			return state.map(blog => blog.id === blogId ? newBlog : blog).sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
		},
		deleteBlog(state, action) {
			const blogId = action.payload.id
			return state.filter(blog => blog.id !== blogId)
		}
	},
})

const { createBlog, setBlogs, voteBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const appendBlog = (blog) => {
	return async (dispatch) => {
		const newBlog = await blogService.create(blog)
		dispatch(createBlog(newBlog))
	}
}

export const voteForBlog = (blog) => {
	return async (dispatch) => {
		const updatedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
		dispatch(voteBlog(updatedBlog))
	}
}

export const removeBlog = (blog) => {
	return async (dispatch) => {
		await blogService.remove(blog)
		dispatch(deleteBlog(blog))
	}
}

export default blogSlice.reducer