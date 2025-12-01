import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

const createApolloClient = () => new ApolloClient({
	link: new HttpLink({
		uri: Constants.expoConfig.extra.apollo_uri,
	}),
	cache: new InMemoryCache(),
});

export default createApolloClient;