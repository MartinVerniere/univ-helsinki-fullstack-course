import { gql } from '@apollo/client';

export const CREATE_USER = gql`
	mutation CreateUser($user: CreateUserInput!) {
		createUser(user: $user) {
			id
			username
		}
	}
`;

export const AUTHENTICATE = gql`
	mutation Authenticate($credentials: AuthenticateInput!) {
		authenticate(credentials: $credentials) {
			accessToken
		}
	}
`;

export const ADD_REVIEW = gql`
	mutation CreateReview($username: String!, $name: String!, $rating: Int!, $review: String) {
		createReview(review: {
			repositoryName: $name,
			ownerName: $username,
			rating: $rating,
			text: $review
		}) {
			id
			userId
			repositoryId
			rating
			createdAt
			text
		}
	}
`;