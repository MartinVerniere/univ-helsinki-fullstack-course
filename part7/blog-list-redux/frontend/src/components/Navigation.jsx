import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import LoginForm from './LoginForm'

const Navigation = ({ user, login, logout }) => {
	const padding = {
		paddingRight: 5
	}

	return (
		<div>
			<Link style={padding} to="/">home</Link>
			<Link style={padding} to="/blogs">blogs</Link>
			<Link style={padding} to="/users">users</Link>
			{user
				? (
					<div>
						<div>{user.name} logged in</div>
						<button onClick={logout}>logout</button>
					</div>
				)
				: (
					<Togglable buttonLabel="login" ref={null}>
						<LoginForm login={login} />
					</Togglable>
				)
			}
		</div>
	)
}

export default Navigation