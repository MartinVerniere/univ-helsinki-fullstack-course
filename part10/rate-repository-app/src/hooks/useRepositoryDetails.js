import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_DETAILS } from '../graphql/queries';

const useRepositoryDetails = (variables) => {
	const { data, fetchMore, loading, error, ...result } = useQuery(GET_REPOSITORY_DETAILS, {
		variables,
		fetchPolicy: 'cache-and-network',
	});

	const handleFetchMore = () => {
		const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				...variables,
				after: data.repository.reviews.pageInfo.endCursor,
			},
		});
	};

	return {
		repository: data
			? data.repository
			: null,
		fetchMore: handleFetchMore,
		loading,
		error,
	};
};

export default useRepositoryDetails;
