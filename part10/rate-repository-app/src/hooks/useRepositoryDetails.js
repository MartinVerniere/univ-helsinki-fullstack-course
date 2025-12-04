import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_DETAILS } from '../graphql/queries';

const useRepositoryDetails = (id) => {
	const { data, loading, error } = useQuery(GET_REPOSITORY_DETAILS, {
		variables: { id },
		fetchPolicy: 'cache-and-network',
	});

	console.log('useRepositoryDetails data:', data);

	return {
		repository: data
			? data.repository
			: null,
		loading,
		error,
	};
};

export default useRepositoryDetails;
