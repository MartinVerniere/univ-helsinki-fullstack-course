import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
	query SortedRepositories($searchKeyword: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
		repositories(searchKeyword: $searchKeyword, orderBy: $orderBy, orderDirection: $orderDirection) {
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
			}
		}
	}
`;

export const GET_REPOSITORY_DETAILS = gql`
  	query ($id: ID!) {
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
			reviews {
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