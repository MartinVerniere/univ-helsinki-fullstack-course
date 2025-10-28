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
		}
	},
})

const { createBlog, setBlogs } = blogSlice.actions

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

export default blogSlice.reducer