import { AppBar, Button, IconButton, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'

const Navigation = ({ user, logout }) => {
	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="menu">
				</IconButton>
				<Button color="inherit" component={Link} to="/">home</Button>
				<Button color="inherit" component={Link} to="/blogs">blogs</Button>
				<Button color="inherit" component={Link} to="/users">users</Button>
				<div color="inherit">
					{user
						? <>
							<em>{user.name} logged in</em>
							<button onClick={logout}>logout</button>
						</>
						: <Button color="inherit" component={Link} to="/login">login</Button>
					}
				</div>
			</Toolbar>
		</AppBar>
	)
}

export default Navigation