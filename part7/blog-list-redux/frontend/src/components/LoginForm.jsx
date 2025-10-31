import { Button, TextField } from '@mui/material'
import { useState } from 'react'

const LoginForm = ({ login }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const loginUser = (event) => {
		event.preventDefault()
		login({
			username: username,
			password: password,
		})

		setUsername('')
		setPassword('')
	}

	return (
		<form onSubmit={loginUser}>
			<div>
				<TextField label="username" variant="filled" value={username} onChange={({ target }) => setUsername(target.value)} />
			</div>
			<div>
				<TextField label="password" variant="filled" value={password} onChange={({ target }) => setPassword(target.value)} />
			</div>
			<Button variant="contained" color="primary" type="submit">login</Button>
		</form>
	)
}

export default LoginForm
