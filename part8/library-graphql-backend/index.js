const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

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
				try {
					await author.save()
				} catch (error) {
					throw new GraphQLError('Saving author on addBook failed - author name must be longer than 4 characters', {
						extensions: {
							code: 'BAD_USER_INPUT',
							invalidArgs: args.author,
							error
						}
					})
				}
			}

			const newBook = new Book({
				title: args.title,
				published: args.published,
				author: author._id,
				genres: args.genres
			})
			try {
				const response = await newBook.save()
				return response.populate('author')
			} catch (error) {
				throw new GraphQLError('Saving book failed - book title must be longer than 4 characters', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.title,
						error
					}
				})
			}
		},
		editAuthor: async (root, args) => {
			const authorToEdit = await Author.findOne({ name: args.name })
			if (!authorToEdit) {
				throw new GraphQLError('Editing author failed - author doesnt exist', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.title
					}
				})
			}

			authorToEdit.born = args.setBornTo
			try {
				const response = await authorToEdit.save()
				return response
			} catch (error) {
				throw new GraphQLError('Editing author failed - new birthday must be a Number', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.title,
						error
					}
				})
			}
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