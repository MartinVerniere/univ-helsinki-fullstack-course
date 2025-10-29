import { useState, useEffect, useRef, useContext } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NotificationContext from './NotificationContext'

const App = () => {
	const { notificationDispatch } = useContext(NotificationContext)

	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)

	const blogFormRef = useRef(null)

	const login = async (userObject) => {
		try {
			const user = await loginService.login(userObject)
			window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)

			notificationDispatch({ type: 'LOGIN', payload: user })
			setTimeout(() => { notificationDispatch({ type: 'CLEAR', payload: null }) }, 5000)
		} catch (error) {
			console.log(error)

			notificationDispatch({ type: 'ERROR_LOGIN', payload: { content: 'invalid username or password' } })
			setTimeout(() => { notificationDispatch({ type: 'CLEAR', payload: null }) }, 5000)
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

			notificationDispatch({ type: 'ADD', payload: blogAdded })
			setTimeout(() => { notificationDispatch({ type: 'CLEAR', payload: null }) }, 5000)
		} catch (error) {
			console.log(error)

			notificationDispatch({ type: 'ERROR_ADD', payload: blogObject })
			setTimeout(() => { notificationDispatch({ type: 'CLEAR', payload: null }) }, 5000)
		}
	}

	const likeBlog = async (blogObject) => {
		try {
			const blogLiked = await blogService.update(blogObject)
			console.log(blogLiked)
			setBlogs(blogs.map((blog) => blog.id === blogLiked.id ? blogLiked : blog))

			notificationDispatch({ type: 'LIKE', payload: blogLiked })
			setTimeout(() => { notificationDispatch({ type: 'CLEAR', payload: null }) }, 5000)
		} catch (error) {
			console.log(error)

			notificationDispatch({ type: 'ERROR_LIKE', payload: blogObject })
			setTimeout(() => { notificationDispatch({ type: 'CLEAR', payload: null }) }, 5000)
		}
	}

	const deleteBlog = async (blogObject) => {
		if (window.confirm(`Remove blog "${blogObject.title}" by ${blogObject.author}?`)) {
			try {
				await blogService.remove(blogObject)
				setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))

				notificationDispatch({ type: 'DELETE', payload: blogObject })
				setTimeout(() => { notificationDispatch({ type: 'CLEAR', payload: null }) }, 5000)
			} catch (error) {
				console.log(error)

				notificationDispatch({ type: 'ERROR_DELETE', payload: blogObject })
				setTimeout(() => { notificationDispatch({ type: 'CLEAR', payload: null }) }, 5000)
			}
		} else {
			console.log('Delete canceled')
			return
		}
	}

	const sortComparison = (firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes

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
