import { useQuery } from "@apollo/client/react"
import { ALL_AUTHORS } from "./queries"
import EditAuthor from "./EditAuthor"

const Authors = (props) => {
	const queryResponse = useQuery(ALL_AUTHORS)

	if (!props.show) return null

	if (queryResponse.loading) return <div>loading...</div>
	const authors = queryResponse.data.allAuthors

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<EditAuthor authors={authors} token={props.token} />
		</div>
	)
}

export default Authors
