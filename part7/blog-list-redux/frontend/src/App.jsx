import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { Routes, Route, useMatch } from 'react-router-dom'
import Users from './components/Users'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import { loginUser, logoutUser } from './reducers/userReducer'
import { notifyAnError } from './reducers/notificationReducer'
import userService from './services/users'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'

const App = () => {
	const blogs = useSelector(({ blogs }) => blogs)
	const user = useSelector(({ user }) => user)
	const [users, setUsers] = useState([])

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

	const fetchUsers = async () => {
		try {
			const usersData = await userService.getAll()
			setUsers(usersData)
		} catch (error) {
			console.error('Error fetching users:', error)
		}
	}

	const userMatch = useMatch('/users/:id')
	const selectedUser = userMatch
		? users
			? users.find(user => user.id === userMatch.params.id)
			: null
		: null

	const blogMatch = useMatch('/blogs/:id')
	const selectedBlog = blogMatch
		? blogs
			? blogs.find(blog => blog.id === blogMatch.params.id)
			: null
		: null

	useEffect(() => {
		dispatch(initializeBlogs())
		dispatch(initializeUser())
	}, [dispatch])

	useEffect(() => {
		fetchUsers()
	}, [])

	console.log('Current user:', user)

	return (
		<div>
			<Navigation user={user} login={login} logout={handleLogout} />
			<h1>Blogs</h1>
			<Notification />
			<div>
				{user
					? (
						<Routes>
							<Route path="/" element={<div><h2>Welcome to the Blog App</h2></div>} />
							<Route path="/blogs" element={<Blogs blogs={blogs} user={user} />} />
							<Route path="/blogs/:id" element={<Blog selectedBlog={selectedBlog} user={user} />} />
							<Route path="/users/" element={<Users users={users} />} />
							<Route path="/users/:id" element={<User selectedUser={selectedUser} />} />
						</Routes>
					)
					: <div>Please log in to view the content.</div>
				}
			</div>
		</div>
	)
}

export default App
