import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

export const useSignIn = () => {
	const [mutate, result] = useMutation(AUTHENTICATE);
	const apolloClient = useApolloClient();
	const authStorage = useAuthStorage();

	const signIn = async ({ username, password }) => {
		const response = await mutate({
			variables: { credentials: { username, password } },
		});

		await authStorage.setAccessToken(response.data.authenticate.accessToken);
		apolloClient.resetStore();

		return response;
	};

	return [signIn, result];
};