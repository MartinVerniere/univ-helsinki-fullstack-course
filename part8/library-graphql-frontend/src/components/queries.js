import { gql } from "@apollo/client"

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		published
		author {
			name
			born
			bookCount
		}
		genres
	}
`

const AUTHOR_DETAILS = gql`
  	fragment AuthorDetails on Author {
		name
		born
		id
		bookCount
	}
`

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			...AuthorDetails
		}	
	}
	${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
	query allBooks($author: String, $genre: String) {
		allBooks(author: $author, genre: $genre) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
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
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const EDIT_BIRTHDAY = gql`
	mutation editBirthday($name: String!, $birthday: Int!) {
		editAuthor(
			name: $name, 
			setBornTo: $birthday
		) {
			...AuthorDetails
		}
	}
	${AUTHOR_DETAILS}
`

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password)  {
			value
		}
	}
`

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`