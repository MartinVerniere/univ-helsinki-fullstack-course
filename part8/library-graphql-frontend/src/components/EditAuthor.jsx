import { useState } from "react"
import { useMutation } from '@apollo/client/react'
import { ALL_AUTHORS, EDIT_BIRTHDAY } from "./queries"

const EditAuthor = () => {
	const [name, setName] = useState('')
	const [birthday, setBirthday] = useState('')

	const [changeBirthday] = useMutation(EDIT_BIRTHDAY, {
		refetchQueries: [
			{ query: ALL_AUTHORS }
		]
	})

	const submit = (event) => {
		event.preventDefault()

		const queryResponse = changeBirthday({ variables: { name, birthday: parseInt(birthday) } })
		console.log(queryResponse)

		setName('')
		setBirthday('')
	}

	return (
		<div>
			<h2>Set Birthday</h2>

			<form onSubmit={submit}>
				<div>
					name
					<input value={name} onChange={({ target }) => setName(target.value)} />
				</div>
				<div>
					born
					<input value={birthday} onChange={({ target }) => setBirthday(target.value)} />
				</div>
				<button type='submit'>update author</button>
			</form>
		</div>
	)
}

export default EditAuthor