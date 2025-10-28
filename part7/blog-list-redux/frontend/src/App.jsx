import { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { notifyAnError, notifyCreated, notifyDeleted, notifyVoted } from './reducers/notificationReducer'
import { appendBlog, initializeBlogs, removeBlog, voteForBlog } from './reducers/blogReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'

const App = () => {
	const blogs = useSelector(({ blogs }) => blogs)
	const user = useSelector(({ user }) => user)

	const blogFormRef = useRef()
	const dispatch = useDispatch()

	const login = async (credentials) => {
		try {
			await dispatch(loginUser(credentials))
		} catch (error) {
			console.log(error)
			dispatch(notifyAnError('invalid username or password', 5))
		}
	}

	const handleLogout = () => dispatch(logoutUser())

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

	const loginForm = () => (
		<Togglable buttonLabel="login" ref={null}>
			<LoginForm login={login} />
		</Togglable>
	)

	const blogForm = () => (
		<Togglable buttonLabel="new blog" ref={blogFormRef}>
			<h2>Create new</h2>
			<BlogsForm createBlog={createBlog} />
		</Togglable>
	)

	useEffect(() => {
		dispatch(initializeBlogs())
		dispatch(initializeUser())
	}, [dispatch])

	return (
		<div>
			<h1>Blogs</h1>
			<Notification />

			{!user && loginForm()}

			{user && (
				<div>
					<div>{user.name} logged in</div>
					<button onClick={() => handleLogout()}>logout</button>
					<h2>blogs</h2>
					{blogForm()}
					<BlogList
						blogs={blogs}
						likeBlog={likeBlog}
						user={user}
						deleteBlog={deleteBlog}
					/>
				</div>
			)}
		</div>
	)
}

export default App
