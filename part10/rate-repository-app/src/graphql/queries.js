import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
	query SortedRepositories($searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $first: Int, $after: String) {
		repositories(searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection, after: $after, first: $first) {
			edges {
				node {
					id
					ownerAvatarUrl
					fullName
					description
					language
					stargazersCount
					forksCount
					reviewCount
					ratingAverage
				}
				cursor
			}
			pageInfo {
				endCursor
				startCursor
				hasNextPage
			}
		}
	}
`;

export const GET_REPOSITORY_DETAILS = gql`
  	query RepositoryDetails($id: ID!, $first: Int, $after: String) {
		repository(id: $id) {
			id
			ownerAvatarUrl
			fullName
			description
			language
			stargazersCount
			forksCount
			reviewCount
			ratingAverage
			url
			reviews (after: $after, first: $first) {
				totalCount
				edges {
					node {
						id
						text
						rating
						createdAt
						user {
							id
							username
						}
					}
					cursor
				}
				pageInfo {
					endCursor
					startCursor
					hasNextPage
				}
			}
		}
  	}
`;

export const ME = gql`
	query getCurrentUser($includeReviews: Boolean = false) {
		me {
			id
			username
			reviews @include(if: $includeReviews) {
				edges {
					node {
						id
						rating
						text
						createdAt
						repository {
							id
							fullName
							name
							description
						}
					}
				}
			}
		}
	}
`;