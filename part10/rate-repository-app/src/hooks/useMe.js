import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useMe = (withReviews = false) => {
	const { data, loading, error } = useQuery(ME, {
		variables: withReviews ? { includeReviews: true } : {}
	});

	console.log('useMe data:', data);

	return { data, loading, error };
};

export default useMe;
