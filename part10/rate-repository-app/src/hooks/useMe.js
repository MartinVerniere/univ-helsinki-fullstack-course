import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useMe = (withReviews = false) => {
	const { data, loading, error } = useQuery(ME, {
		variables: withReviews ? { includeReviews: true } : {}
	});

	return { data, loading, error };
};

export default useMe;
