import { render, screen, within } from '@testing-library/react-native';
import { Text, View } from "react-native";

const RepositoryListContainer = ({ repositoryNodes }) => {
	const formatCount = (num) => {
		if (num < 1000) return String(num);
		return (num / 1000).toFixed(1).replace('.0', '') + 'k';
	};

	return (
		<View>
			{repositoryNodes.map((item) => (
				<View key={item.id} testID="repositoryItem">
					<Text testID="fullName">{item.fullName}</Text>
					<Text testID='description'>{item.description}</Text>
					<Text testID='language'>{item.language}</Text>
					<Text testID='stargazersCount'>{formatCount(item.stargazersCount)}</Text>
					<Text testID='forksCount'>{formatCount(item.forksCount)}</Text>
					<Text testID='reviewCount'>{item.reviewCount}</Text>
					<Text testID='ratingAverage'>{item.ratingAverage}</Text>
				</View>
			))}
		</View>
	);
}

describe('RepositoryList', () => {
	describe('RepositoryListContainer', () => {
		it('renders repository information correctly', () => {
			const repositories = {
				totalCount: 8,
				pageInfo: {
					hasNextPage: true,
					endCursor:
						'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
					startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
				},
				edges: [
					{
						node: {
							id: 'jaredpalmer.formik',
							fullName: 'jaredpalmer/formik',
							description: 'Build forms in React, without the tears',
							language: 'TypeScript',
							forksCount: 1619,
							stargazersCount: 21856,
							ratingAverage: 88,
							reviewCount: 3,
							ownerAvatarUrl:
								'https://avatars2.githubusercontent.com/u/4060187?v=4',
						},
						cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
					},
					{
						node: {
							id: 'async-library.react-async',
							fullName: 'async-library/react-async',
							description: 'Flexible promise-based React data loader',
							language: 'JavaScript',
							forksCount: 69,
							stargazersCount: 1760,
							ratingAverage: 72,
							reviewCount: 3,
							ownerAvatarUrl:
								'https://avatars1.githubusercontent.com/u/54310907?v=4',
						},
						cursor:
							'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
					},
				],
			};

			render(<RepositoryListContainer repositoryNodes={repositories.edges.map(edge => edge.node)} />);

			const repositoryItems = screen.getAllByTestId('repositoryItem');
			const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

			const firstRepo = within(firstRepositoryItem);
			const secondRepo = within(secondRepositoryItem);

			expect(firstRepo.getByTestId('fullName')).toHaveTextContent('jaredpalmer/formik');
			expect(firstRepo.getByTestId('description')).toHaveTextContent('Build forms in React, without the tears');
			expect(firstRepo.getByTestId('language')).toHaveTextContent('TypeScript');
			expect(firstRepo.getByTestId('stargazersCount')).toHaveTextContent('21.9k');
			expect(firstRepo.getByTestId('forksCount')).toHaveTextContent('1.6k');
			expect(firstRepo.getByTestId('reviewCount')).toHaveTextContent('3');
			expect(firstRepo.getByTestId('ratingAverage')).toHaveTextContent('88');

			expect(secondRepo.getByTestId('fullName')).toHaveTextContent('async-library/react-async');
			expect(secondRepo.getByTestId('description')).toHaveTextContent('Flexible promise-based React data loader');
			expect(secondRepo.getByTestId('language')).toHaveTextContent('JavaScript');
			expect(secondRepo.getByTestId('stargazersCount')).toHaveTextContent('1.8k');
			expect(secondRepo.getByTestId('forksCount')).toHaveTextContent('69');
			expect(secondRepo.getByTestId('reviewCount')).toHaveTextContent('3');
			expect(secondRepo.getByTestId('ratingAverage')).toHaveTextContent('72');
		});
	});
});