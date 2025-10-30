import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { Routes, Route } from 'react-router-dom'
import Users from './components/Users'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { loginUser, logoutUser } from './reducers/userReducer'
import { notifyAnError } from './reducers/notificationReducer'
import Togglable from './components/Togglable'
import userService from './services/users'

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

	useEffect(() => {
		dispatch(initializeBlogs())
		dispatch(initializeUser())
	}, [dispatch])

	useEffect(() => {
		fetchUsers()
	}, [])

	return (
		<div>
			<h1>Blogs</h1>
			<Notification />

			{!user &&
				<Togglable buttonLabel="login" ref={null}>
					<LoginForm login={login} />
				</Togglable>
			}

			{user && (
				<div>
					<div>{user.name} logged in</div>
					<button onClick={() => handleLogout()}>logout</button>

					<Routes>
						<Route path="/" element={<Blogs blogs={blogs} user={user} />} />
						<Route path="/users/" element={<Users users={users} />} />
					</Routes>
				</div>
			)}
		</div>
	)
}

export default App
