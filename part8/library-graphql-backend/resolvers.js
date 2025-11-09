const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const Author = require("./models/Author")
const Book = require("./models/Book")

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

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
		allAuthors: async () => {
			console.log("author find")
			return await Author.find({})
		},
		allGenres: async () => {
			const books = await Book.find({})
			return [...new Set(books.flatMap(book => book.genres))]
		},
		me: (root, args, context) => context.currentUser
	},
	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser
			if (!currentUser) {
				throw new GraphQLError('not Authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					}
				})
			}

			let author = await Author.findOne({ name: args.author })
			if (!author) {
				author = new Author({ name: args.author, bookCount: 0 })
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
				await newBook.save()

				author.bookCount = author.bookCount + 1
				await author.save()
			} catch (error) {
				throw new GraphQLError('Saving book failed - book title must be longer than 4 characters', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.title,
						error
					}
				})
			}

			const populatedBook = await newBook.populate('author')
			pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })

			return populatedBook
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser
			if (!currentUser) {
				throw new GraphQLError('not Authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					}
				})
			}

			const authorToEdit = await Author.findOne({ name: args.name })
			if (!authorToEdit) {
				throw new GraphQLError('Editing author failed - author doesnt exist', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name
					}
				})
			}

			authorToEdit.born = args.setBornTo
			try {
				await authorToEdit.save()
			} catch (error) {
				throw new GraphQLError('Editing author failed - new birthday must be a Number', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.setBornTo,
						error
					}
				})
			}
			return authorToEdit
		},
		createUser: async (root, args) => {
			const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })

			return user.save()
				.catch(error => {
					throw new GraphQLError('Creating the user failed', {
						extensions: {
							code: 'BAD_USER_INPUT',
							invalidArgs: args.username,
							error
						}
					})
				})
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if (!user || args.password !== 'secret') {
				throw new GraphQLError('wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				})
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
		},
	},
}

module.exports = { resolvers }