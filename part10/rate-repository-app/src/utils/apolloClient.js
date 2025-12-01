import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const createApolloClient = () => new ApolloClient({
	link: new HttpLink({
		uri: 'http://192.168.100.3:4000/graphql',
	}),
	cache: new InMemoryCache(),
});

export default createApolloClient;