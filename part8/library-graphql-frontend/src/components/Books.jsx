import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS } from "./queries"
import { useState } from "react"

const Books = (props) => {

	const queryResponse = useQuery(ALL_BOOKS)
	const [genre, setGenre] = useState(null)

	if (!props.show) return null

	if (queryResponse.loading) return <div>loading...</div>
	const books = queryResponse.data.allBooks

	const allGenres = [...new Set(books.flatMap(book => book.genres))]
	console.log(allGenres);
	const booksToShow = genre
		? books.filter(book => book.genres.includes(genre))
		: books

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
				allGenres.map((genre) => (<button key={genre} onClick={() => setGenre(genre)}>{genre}</button>))
			}
			<button key={genre} onClick={() => setGenre(null)}>all genres</button>
		</div >
	)
}

export default Books
