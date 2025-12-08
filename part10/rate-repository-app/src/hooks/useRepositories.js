import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (selectedQuery, selectedOrder) => {
	const sortingOrder = selectedOrder === "CREATED_AT"
		? "CREATED_AT"
		: "RATING_AVERAGE";

	const sortingOrderAscending = selectedOrder === "RATING_AVERAGE_REVERSE"
		? "ASC"
		: "DESC";

	const { data, loading, error } = useQuery(GET_REPOSITORIES, {
		variables: {
			searchKeyword: selectedQuery,
			orderBy: sortingOrder,
			orderDirection: sortingOrderAscending,
		},
		fetchPolicy: 'cache-and-network',
	});

	return {
		repositories: data
			? data.repositories.edges
			: [],
		loading,
		error,
	};
};

export default useRepositories;
