import { useApolloClient, useQuery, useSubscription } from '@apollo/client/react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { ALL_PERSONS, PERSON_ADDED } from './components/queries'
import { useState } from 'react'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'

export const updateCache = (cache, query, addedPerson) => {
	// helper that is used to eliminate saving same person twice  
	const uniqByName = (a) => {
		let seen = new Set()
		return a.filter((item) => {
			let k = item.name
			return seen.has(k)
				? false
				: seen.add(k)
		})
	}
	cache.updateQuery(query, ({ allPersons }) => {
		return {
			allPersons: uniqByName(allPersons.concat(addedPerson)),
		}
	})
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

	useSubscription(PERSON_ADDED, {
		onData: ({ data, client }) => {
			const addedPerson = data.data.personAdded
			notify(`${addedPerson.name} added`)

			updateCache(client.cache, { query: ALL_PERSONS }, addedPerson)
		}
	})

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