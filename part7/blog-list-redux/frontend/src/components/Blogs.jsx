import { useDispatch } from 'react-redux'
import { appendBlog } from '../reducers/blogReducer'
import { notifyAnError, notifyCreated } from '../reducers/notificationReducer'
import BlogList from './BlogList'
import { useRef } from 'react'
import Togglable from './Togglable'
import BlogsForm from './BlogsForm'

const Blogs = ({ blogs, user }) => {
	const blogFormRef = useRef(null)
	const dispatch = useDispatch()

	const createBlog = async (blogObject) => {
		try {
			dispatch(appendBlog(blogObject))
			dispatch(notifyCreated(`a new blog '${blogObject.title}' by ${blogObject.author} added`, 5))
			blogFormRef.current.toggleVisibility()
		} catch (error) {
			console.log(error)
			dispatch(notifyAnError(`Blog '${blogObject.title}' couldn't be added to the list`, 5))
		}
	}

	return (
		<div>
			<h2>blogs</h2>
			<Togglable buttonLabel="new blog" ref={blogFormRef}>
				<h2>Create new</h2>
				<BlogsForm createBlog={createBlog} />
			</Togglable>
			{user && (
				<BlogList blogs={blogs} />
			)}
		</div>
	)
}

export default Blogs