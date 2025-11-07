import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
query {
	allAuthors {
		name
		born
		id
		bookCount
	}
}
`

export const ALL_BOOKS = gql`
query allBooks($author: String, $genre: String) {
	allBooks(author: $author, genre: $genre) {
		title
		published
		author {
			name
			born
			bookCount
		}
		genres
	}
}
`

export const ALL_GENRES = gql`
query {
	allGenres
}
`

export const USER_DATA = gql`
query {
	me {
		username
		favouriteGenre
	}
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
	addBook(
		title: $title,
		author: $author,
		published: $published,
		genres: $genres
	) {
		title
		author {
			name
			born
			bookCount
		}
		published
		genres
	}
}
`

export const EDIT_BIRTHDAY = gql`
	mutation editBirthday($name: String!, $birthday: Int!) {
		editAuthor(
			name: $name, 
			setBornTo: $birthday
		) {
			name
			born
		}
	}
`

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password)  {
			value
		}
	}
`