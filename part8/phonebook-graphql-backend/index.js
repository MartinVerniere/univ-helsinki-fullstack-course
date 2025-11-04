const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Person = require('./models/Person')
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
	enum YesNo {
		YES  
		NO
	}
	
	type Address {  
		street: String!  
		city: String! 
	}

	type Person {
		name: String!
		phone: String
		address: Address! 
		id: ID!
	}

  	type Query {
    	personCount: Int!
		allPersons(phone: YesNo): [Person!]!
    	findPerson(name: String!): Person
  	}

	type Mutation {
		addPerson(
			name: String!
			phone: String
			street: String!
			city: String!
		): Person
		editNumber(
			name: String!    
			phone: String!
		): Person
	}
`

const resolvers = {
	Query: {
		personCount: () => Person.collection.countDocuments(),
		allPersons: (root, args) => {
			if (!args.phone) return Person.collection.countDocuments()
			return Person.find({ phone: { $exists: args.phone === 'YES' } })
		},
		findPerson: async (root, args) => Person.findOne({ name: args.name }),
	},
	Person: {
		address: (root) => {
			return {
				street: root.street,
				city: root.city
			}
		}
	},
	Mutation: {
		addPerson: async (root, args) => {
			const person = new Person({ ...args })
			try {
				await person.save()
			} catch (error) {
				throw new GraphQLError('Saving person failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error
					}
				})
			}
		},
		editNumber: async (root, args) => {
			const person = await Person.findOne({ name: args.name })
			person.phone = args.phone
			try {
				await person.save()
			} catch (error) {
				throw new GraphQLError('Saving number failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
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