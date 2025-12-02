import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

export const useSignOut = () => {
	const apolloClient = useApolloClient();
	const authStorage = useAuthStorage();

	const signOut = async () => {
		console.log('Signing out...');
		await authStorage.removeAccessToken();
		apolloClient.resetStore();
	};

	return { signOut };
};