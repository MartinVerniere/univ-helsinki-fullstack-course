import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS, USER_DATA } from "./queries"

const Recommendations = (props) => {
	const queryResponse = useQuery(USER_DATA)
	const secondQueryResponse = useQuery(ALL_BOOKS)

	if (!props.show) return null
	if (queryResponse.loading) return <div>loading...</div>
	if (secondQueryResponse.loading) return <div>loading...</div>

	const favouriteGenre = queryResponse.data.me.favouriteGenre
	const books = secondQueryResponse.data.allBooks

	const booksToShow = favouriteGenre
		? books.filter(book => book.genres.includes(favouriteGenre))
		: books

	return (
		<div>
			<h2>books</h2>
			<label>books in your favourite genre <b>{favouriteGenre}</b></label>
			{booksToShow.length > 0
				? <table>
					<tbody>
						<tr>
							<th></th>
							<th>author</th>
							<th>published</th>
						</tr>
						{booksToShow.map((a) => (
							<tr key={a.title}>
								<td>{a.title}</td>
								<td>{a.author.name}</td>
								<td>{a.published}</td>
							</tr>
						))}
					</tbody>
				</table>
				: <div>There are no books of this genre</div>
			}
		</div >
	)
}

export default Recommendations
