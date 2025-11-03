import { useQuery } from '@apollo/client/react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import { ALL_PERSONS } from './components/queries'
import { useState } from 'react'
import PhoneForm from './components/PhoneForm'

const Notify = ({ errorMessage }) => {
	if (!errorMessage) return null

	return (
		<div style={{ color: 'red' }}>
			{errorMessage}
		</div>
	)
}

const App = () => {
	const [errorMessage, setErrorMessage] = useState(null)

	const result = useQuery(ALL_PERSONS)

	const notify = (message) => {
		setErrorMessage(message)
		setTimeout(() => { setErrorMessage(null) }, 10000)
	}

	if (result.loading) return <div>loading...</div>

	return (
		<div>
			<Notify errorMessage={errorMessage} />
			<Persons persons={result.data.allPersons} />
			<PersonForm setError={notify} />
			<PhoneForm setError={notify} />
		</div>
	)
}

export default App