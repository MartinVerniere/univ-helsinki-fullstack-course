import { useApolloClient, useQuery } from '@apollo/client/react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { ALL_PERSONS } from './components/queries'
import { useState } from 'react'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

const Notify = ({ errorMessage }) => {
	if (!errorMessage) return null
	return <div style={{ color: 'red' }}> {errorMessage} </div>
}

const App = () => {
	const [token, setToken] = useState(null)
	const [errorMessage, setErrorMessage] = useState(null)
	const result = useQuery(ALL_PERSONS)
	const client = useApolloClient()

	console.log("token:", token)
	console.log("result:", result)

	const notify = (message) => {
		setErrorMessage(message)
		setTimeout(() => { setErrorMessage(null) }, 10000)
	}

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	if (!token) {
		return (
			<>
				<Notify errorMessage={errorMessage} />
				<LoginForm setToken={setToken} setError={notify} />
			</>
		)
	}

	if (result.loading) return <div>loading...</div>

	return (
		<>
			<Notify errorMessage={errorMessage} />
			<button onClick={logout}>logout</button>
			<Persons persons={result.data.allPersons} />
			<PersonForm setError={notify} />
			<PhoneForm setError={notify} />
		</>
	)
}

export default App