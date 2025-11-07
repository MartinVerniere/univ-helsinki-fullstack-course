import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS, ALL_GENRES } from "./queries"
import { useState } from "react"

const Books = (props) => {
	if (!props.show) return null

	const [genre, setGenre] = useState(null)

	const queryResponse = useQuery(ALL_GENRES)
	const genres = queryResponse.data ? queryResponse.data.allGenres : []

	const secondQueryResponse = useQuery(ALL_BOOKS, { variables: { genre: genre } })
	if (secondQueryResponse.loading) return <div>loading...</div>
	const booksToShow = secondQueryResponse.data.allBooks

	return (
		<div>
			<h2>books</h2>
			<label>in genre: <b>{genre ? genre : "all genres"}</b></label>
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
				: <div>No books found</div>
			}

			{
				genres.map((genre) => (<button key={genre} onClick={() => setGenre(genre)}>{genre}</button>))
			}
			<button key={genre} onClick={() => setGenre(null)}>all genres</button>
		</div >
	)
}

export default Books
