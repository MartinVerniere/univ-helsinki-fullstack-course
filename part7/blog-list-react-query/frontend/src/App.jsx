import { useEffect, useRef, useContext } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NotificationContext from './NotificationContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import UserContext from './UserContext'

const App = () => {
	const { notificationDispatch } = useContext(NotificationContext)
	const { user, userDispatch } = useContext(UserContext)

	const queryClient = useQueryClient()
	const resultBlogs = useQuery({
		queryKey: ['blogs'],
		queryFn: blogService.getAll,
		retry: false
	})

	const blogFormRef = useRef(null)

	const newBlogMutation = useMutation({
		mutationFn: blogService.create,
		onSuccess: (blogAdded) => {
			const blogs = queryClient.getQueryData(['blogs'])
			queryClient.setQueryData(['blogs'], blogs.concat(blogAdded))
			blogFormRef.current.toggleVisibility()
			notificationDispatch({ type: 'ADD', payload: blogAdded })
			setTimeout(() => { notificationDispatch({ type: 'CLEAR', payload: null }) }, 5000)
		},
		onError: (error, blogObject) => {
			console.log(error)
			notificationDispatch({ type: 'ERROR_ADD', payload: blogObject })
			setTimeout(() => { notificationDispatch({ type: 'CLEAR', payload: null }) }, 5000)
		}
	})

	const updateBlogMutation = useMutation({
		mutationFn: blogService.update,
		onSuccess: (blogLiked) => {
			const blogs = queryClient.getQueryData(['blogs'])
			queryClient.setQueryData(['blogs'], blogs.map((blog) => blog.id === blogLiked.id ? blogLiked : blog))
			notificationDispatch({ type: 'LIKE', payload: blogLiked })
			setTimeout(() => { notificationDispatch({ type: 'CLEAR', payload: null }) }, 5000)
		},
		onError: (error, blogObject) => {
			console.log(error)
			notificationDispatch({ type: 'ERROR_LIKE', payload: blogObject })
			setTimeout(() => { notificationDispatch({ type: 'CLEAR', payload: null }) }, 5000)
		}
	})

	const deleteBlogMutation = useMutation({
		mutationFn: blogService.remove,
		onSuccess: (_, deletedBlog) => {
			const blogs = queryClient.getQueryData(['blogs'])
			queryClient.setQueryData(['blogs'], blogs.filter((blog) => blog.id !== deletedBlog.id))
			notificationDispatch({ type: 'DELETE', payload: deletedBlog })
			setTimeout(() => { notificationDispatch({ type: 'CLEAR', payload: null }) }, 5000)
		},
		onError: (error, blogObject) => {
			console.log(error)
			notificationDispatch({ type: 'ERROR_DELETE', payload: blogObject })
			setTimeout(() => { notificationDispatch({ type: 'CLEAR', payload: null }) }, 5000)
		}
	})

	const loginMutation = useMutation({
		mutationFn: loginService.login,
		onSuccess: (user) => {
			window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			userDispatch({ type: 'LOGIN', payload: user })

			notificationDispatch({ type: 'LOGIN', payload: user })
			setTimeout(() => { notificationDispatch({ type: 'CLEAR', payload: null }) }, 5000)
		},
		onError: (error) => {
			console.log(error)

			notificationDispatch({ type: 'ERROR_LOGIN', payload: { content: 'invalid username or password' } })
			setTimeout(() => { notificationDispatch({ type: 'CLEAR', payload: null }) }, 5000)
		}
	})

	const logoutMutation = useMutation({
		mutationFn: () => Promise.resolve(),
		onSuccess: () => {
			window.localStorage.removeItem('loggedNoteappUser')
			blogService.setToken(null)
			userDispatch({ type: 'LOGOUT', payload: null })
		}
	})

	const handleLogin = (credentials) => loginMutation.mutate(credentials)
	const handleLogout = () => logoutMutation.mutate()
	const addBlog = (blogObject) => newBlogMutation.mutate(blogObject)
	const likeBlog = (blogObject) => updateBlogMutation.mutate(blogObject)
	const deleteBlog = (blogObject) => deleteBlogMutation.mutate(blogObject)

	const loginForm = () => (
		<Togglable buttonLabel="login" ref={null}>
			<LoginForm login={handleLogin} />
		</Togglable>
	)

	const blogForm = () => (
		<Togglable buttonLabel="new blog" ref={blogFormRef}>
			<h2>Create new</h2>
			<BlogsForm createBlog={addBlog} />
		</Togglable>
	)

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			userDispatch({ type: 'LOGIN', payload: user })
			blogService.setToken(user.token)
		}
	}, [userDispatch])

	console.log(JSON.parse(JSON.stringify(resultBlogs)))

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
						result={resultBlogs}
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
