import { useState } from "react"
import { useMutation } from '@apollo/client/react'
import { ALL_AUTHORS, EDIT_BIRTHDAY } from "./queries"

const EditAuthor = (props) => {

	const [name, setName] = useState(props.authors ? props.authors[0].name : '')
	const [birthday, setBirthday] = useState('')

	const [changeBirthday] = useMutation(EDIT_BIRTHDAY, {
		refetchQueries: [
			{ query: ALL_AUTHORS }
		]
	})

	if (!props.authors || !props.token) return null

	const submit = async (event) => {
		event.preventDefault()

		const queryResponse = await changeBirthday({ variables: { name, birthday: parseInt(birthday) } })
		console.log(queryResponse)

		setBirthday('')
	}

	return (
		<div>
			<h2>Set Birthday</h2>

			<form onSubmit={submit}>
				<select onChange={({ target }) => setName(target.value)}>
					{props.authors.map(author =>
						<option key={author.id} value={author.name}>{author.name}</option>
					)}
				</select>
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