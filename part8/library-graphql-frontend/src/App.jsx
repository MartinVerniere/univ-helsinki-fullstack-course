import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";
import { useApolloClient, useSubscription } from "@apollo/client/react";
import { ALL_BOOKS, BOOK_ADDED } from "./components/queries";

export const updateCache = (cache, query, addedBook) => {
	const uniqueByTitle = (books) => {
		let seenBooks = new Set()
		return books.filter((book) => {
			let title = book.title
			return seenBooks.has(title)
				? false
				: seenBooks.add(title)
		})
	}
	cache.updateQuery(query, ({ allBooks }) => {
		return {
			allBooks: uniqueByTitle(allBooks.concat(addedBook)),
		}
	})
}

const App = () => {
	const [page, setPage] = useState("authors")
	const [token, setToken] = useState(null)
	const client = useApolloClient()

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	useSubscription(BOOK_ADDED, {
		onData: ({ data, client }) => {
			const addedBook = data.data.bookAdded
			updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
			window.alert(`A book ${addedBook.title} has been added`)
		}
	})

	return (
		<div>
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				{token
					? (
						<>
							<button onClick={() => setPage("add")}>add book</button>
							<button onClick={() => setPage("recommendations")}>recommend</button>
							<button onClick={() => logout()}>logout</button>
						</>
					)
					: <button onClick={() => setPage("login")}>login</button>
				}
			</div>

			<Authors show={page === "authors"} token={token} />
			<Books show={page === "books"} />
			<NewBook show={page === "add"} />
			<Recommendations show={page === "recommendations"} />
			<Login show={page === "login"} setToken={setToken} />
		</div>
	);
};

export default App;
