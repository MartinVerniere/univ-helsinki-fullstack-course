import { Link } from 'react-router-dom'

const Navigation = ({ user, logout }) => {
	const padding = {
		paddingRight: 5
	}

	return (
		<div>
			<Link to="/">home</Link>{' '}
			<Link to="/blogs">blogs</Link>{' '}
			<Link to="/users">users</Link>{' '}
			{user ? (
				<>
					<span>{user.name} logged in</span>{' '}
					<button onClick={logout}>logout</button>
				</>
			) : (
				<Link to="/login">login</Link>
			)}
		</div>
	)
}

export default Navigation