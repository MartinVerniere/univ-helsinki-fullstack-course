const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/Book')
const Author = require('./models/Author')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

const typeDefs = `
	type Author {
		name: String!
		id: ID!
		born: Int
		bookCount: Int!
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		id: ID!
		genres: [String!]!
	}

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
	}

	type Mutation {
		addBook(
			title: String!
			published: Int!
			author: String!
			genres: [String!]!
		): Book
		editAuthor(
			name: String!   
			setBornTo: Int!
		): Author
	}
`

const resolvers = {
	Query: {
		bookCount: async () => await Book.collection.countDocuments(),
		authorCount: async () => await Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (!args.author && !args.genre) return await Book.find({}).populate('author')
			if (args.author && args.genre) {
				const author = await Author.findOne({ name: args.author })
				if (!author) return []
				return await Book.find({ author: author._id, genres: args.genre }).populate('author')
			}
			if (args.author) {
				const author = await Author.findOne({ name: args.author })
				if (!author) return []
				return await Book.find({ author: author._id }).populate('author')
			}
			if (args.genre) return await Book.find({ genres: args.genre }).populate('author')
		},
		allAuthors: async () => await Author.find({})
	},
	Author: {
		bookCount: async (root) => await Book.countDocuments({ author: root._id })
	},
	Mutation: {
		addBook: async (root, args) => {
			let author = await Author.findOne({ name: args.author })
			if (!author) {
				author = new Author({ name: args.author })
				await author.save()
			}

			const newBook = new Book({
				title: args.title,
				published: args.published,
				author: author._id,
				genres: args.genres
			})
			const response = await newBook.save()
			return response.populate('author')
		},
		editAuthor: async (root, args) => {
			const authorToEdit = await Author.findOne({ name: args.name })
			if (!authorToEdit) return null

			authorToEdit.born = args.setBornTo
			const response = await authorToEdit.save()

			return response
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})