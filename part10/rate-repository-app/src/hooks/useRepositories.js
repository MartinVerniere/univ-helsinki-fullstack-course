import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
	const { data, loading, fetchMore, error, ...result } = useQuery(GET_REPOSITORIES, {
		variables,
		fetchPolicy: 'cache-and-network',
	});

	const handleFetchMore = () => {
		const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				...variables,
				after: data.repositories.pageInfo.endCursor,
			},
		});
	};

	return {
		repositories: data
			? data.repositories.edges
			: [],
		fetchMore: handleFetchMore,
		loading,
		error,
		...result
	};
};

export default useRepositories;
