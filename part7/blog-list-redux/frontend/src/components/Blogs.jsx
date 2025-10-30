import { useDispatch } from 'react-redux'
import { appendBlog, removeBlog, voteForBlog } from '../reducers/blogReducer'
import { notifyAnError, notifyCreated, notifyDeleted, notifyVoted } from '../reducers/notificationReducer'
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

	const likeBlog = async (blogObject) => {
		try {
			dispatch(voteForBlog(blogObject))
			dispatch(notifyVoted(`blog '${blogObject.title}' by ${blogObject.author} has been liked`, 5))
		} catch (error) {
			console.log(error)
			dispatch(notifyAnError(`Blog '${blogObject.title}' couldn't be liked`, 5))
		}
	}

	const deleteBlog = async (blogObject) => {
		if (
			window.confirm(`Remove blog '${blogObject.title}' by ${blogObject.author}?`)
		) {
			try {
				dispatch(removeBlog(blogObject))
				dispatch(notifyDeleted(`blog '${blogObject.title}' by ${blogObject.author} has been deleted`, 5))
			} catch (error) {
				console.log(error)
				dispatch(notifyAnError(`Blog '${blogObject.title}' couldn't be deleted`, 5))
			}
		} else {
			console.log('Delete canceled')
			return
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
				<BlogList
					blogs={blogs}
					likeBlog={likeBlog}
					user={user}
					deleteBlog={deleteBlog}
				/>
			)}
		</div>
	)
}

export default Blogs