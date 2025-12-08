import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';

const apolloUri = Constants.expoConfig.extra.apollo_uri;

const httpLink = new HttpLink({
	uri: apolloUri,
});

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				repositories: relayStylePagination(),
			},
		},
	},
});

const createApolloClient = (authStorage) => {
	const authLink = setContext(async (_, { headers }) => {
		try {
			const accessToken = await authStorage.getAccessToken();
			return {
				headers: {
					...headers,
					authorization: accessToken
						? `Bearer ${accessToken}`
						: '',
				},
			};
		} catch (error) {
			console.log(error);
			return { headers };
		}
	});

	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache
	});
};

export default createApolloClient;