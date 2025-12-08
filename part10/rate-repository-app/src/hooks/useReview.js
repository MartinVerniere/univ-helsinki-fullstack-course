import { useMutation } from '@apollo/client';
import { ADD_REVIEW, DELETE_REVIEW } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';

export const useReview = () => {
	const [createReview, resultCreate] = useMutation(ADD_REVIEW);
	const [removeReview, resultRemove] = useMutation(DELETE_REVIEW);
	const apolloClient = useApolloClient();

	const addReview = async ({ username, name, rating, review }) => {
		const response = await createReview({
			variables: { username, name, rating, review },
		});

		apolloClient.resetStore();

		return response;
	};

	const deleteReview = async (reviewId) => {
		const response = await removeReview({
			variables: { id: reviewId },
		});
		
		apolloClient.resetStore();

		return response;
	}

	return {
		addReview,
		deleteReview,
		addResult: resultCreate,
		deleteResult: resultRemove,
	};;
};