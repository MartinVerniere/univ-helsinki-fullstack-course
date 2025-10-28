import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch } from 'react-redux'
import { notifyAnError, notifyCreated, notifyDeleted, notifyVoted } from './reducers/notificationReducer'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)

	const blogFormRef = useRef()
	const dispatch = useDispatch()

	const login = async (userObject) => {
		try {
			const user = await loginService.login(userObject)
			window.localStorage.setItem(
				'loggedNoteappUser',
				JSON.stringify(user),
			)
			blogService.setToken(user.token)
			setUser(user)
		} catch (error) {
			console.log(error)
			dispatch(notifyAnError('invalid username or password', 5))
		}
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedNoteappUser')
		blogService.setToken(null)
		setUser(null)
	}

	const createBlog = async (blogObject) => {
		try {
			const blogAdded = await blogService.create(blogObject)
			blogFormRef.current.toggleVisibility()
			setBlogs(blogs.concat(blogAdded))
			dispatch(notifyCreated(`a new blog '${blogAdded.title}' by ${blogAdded.author} added`, 5))
		} catch (error) {
			console.log(error)
			dispatch(notifyAnError(`Blog '${blogObject.title}' couldn't be added to the list`, 5))
		}
	}

	const likeBlog = async (blogObject) => {
		try {
			const blogLiked = await blogService.update(blogObject)
			console.log(blogLiked)
			dispatch(notifyVoted(`blog '${blogLiked.title}' by ${blogLiked.author} has been liked`, 5))
			setBlogs(blogs.map((blog) => blog.id === blogLiked.id ? blogLiked : blog))
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
				await blogService.remove(blogObject)
				dispatch(notifyDeleted(`blog '${blogObject.title}' by ${blogObject.author} has been deleted`, 5))
				setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
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
			<BlogsForm createBlog={createBlog} likeBlog={likeBlog} />
		</Togglable>
	)

	const sortComparison = (firstBlog, secondBlog) =>
		secondBlog.likes - firstBlog.likes

	useEffect(() => {
		blogService
			.getAll()
			.then((blogs) => setBlogs(blogs.sort(sortComparison)))
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	useEffect(() => {
		setBlogs(blogs.sort(sortComparison))
	}, [blogs])

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
