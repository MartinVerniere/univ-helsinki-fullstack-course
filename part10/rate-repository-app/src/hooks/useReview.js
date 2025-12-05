import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../graphql/mutations';

export const useReview = () => {
	const [mutate, result] = useMutation(ADD_REVIEW);

	const addReview = async ({ username, name, rating, review }) => {
		const response = await mutate({
			variables: { username, name, rating, review },
		});

		return response;
	};

	return [addReview, result];
};