import { View, StyleSheet, FlatList, Text, Image } from 'react-native';
import theme from '../theme';

const repositories = [
	{
		id: 'jaredpalmer.formik',
		fullName: 'jaredpalmer/formik',
		description: 'Build forms in React, without the tears',
		language: 'TypeScript',
		forksCount: 1589,
		stargazersCount: 21553,
		ratingAverage: 88,
		reviewCount: 4,
		ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
	},
	{
		id: 'rails.rails',
		fullName: 'rails/rails',
		description: 'Ruby on Rails',
		language: 'Ruby',
		forksCount: 18349,
		stargazersCount: 45377,
		ratingAverage: 100,
		reviewCount: 2,
		ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
	},
	{
		id: 'django.django',
		fullName: 'django/django',
		description: 'The Web framework for perfectionists with deadlines.',
		language: 'Python',
		forksCount: 21015,
		stargazersCount: 48496,
		ratingAverage: 73,
		reviewCount: 5,
		ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
	},
	{
		id: 'reduxjs.redux',
		fullName: 'reduxjs/redux',
		description: 'Predictable state container for JavaScript apps',
		language: 'TypeScript',
		forksCount: 13902,
		stargazersCount: 52869,
		ratingAverage: 0,
		reviewCount: 0,
		ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
	},
];

const formatCount = (num) => {
	if (num < 1000) return String(num);
	return (num / 1000).toFixed(1).replace('.0', '') + 'k';
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryItemMainInfo = ({ item }) => {
	return (
		<View style={styles.row}>
			<Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
			<View style={styles.column}>
				<Text style={styles.textBold}>{item.fullName}</Text>
				<Text style={styles.text}>{item.description}</Text>
				<Text style={styles.language}>{item.language}</Text>
			</View>

		</View>
	);
}

const RepositoryItemStatsInfo = ({ item }) => {
	return (
		<View style={styles.statsRow}>
			<View style={styles.column}>
				<Text style={styles.textBold}>{formatCount(item.stargazersCount)}</Text>
				<Text style={styles.text} >Stars</Text>
			</View>
			<View style={styles.column}>
				<Text style={styles.textBold}>{formatCount(item.forksCount)}</Text>
				<Text style={styles.text} >Forks</Text>
			</View>
			<View style={styles.column}>
				<Text style={styles.textBold}>{item.reviewCount}</Text>
				<Text style={styles.text} >Reviews</Text>
			</View>
			<View style={styles.column}>
				<Text style={styles.textBold}>{item.ratingAverage}</Text>
				<Text style={styles.text} >Rating</Text>
			</View>
		</View>
	);
}

const RepositoryItem = ({ item }) => {
	return (
		<View style={styles.listElement}>
			<RepositoryItemMainInfo item={item} />
			<RepositoryItemStatsInfo item={item} />
		</View>
	);
}

const RepositoryList = () => {
	return (
		<FlatList
			data={repositories}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <RepositoryItem item={item} />}
			keyExtractor={repsitory => repsitory.id}
			style={styles.list}
		/>
	);
};

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	list: {
		backgroundColor: theme.colors.backgroundSecondary
	},
	listElement: {
		backgroundColor: theme.colors.backgroundTertiary,
		padding: 10,
	},
	text: {
		fontWeight: theme.fontWeights.normal,
		color: theme.colors.textSecondary,
	},
	textBold: {
		fontWeight: theme.fontWeights.bold,
		color: theme.colors.textPrimary,
		fontSize: theme.fontSizes.subheading
	},
	language: {
		backgroundColor: theme.colors.primary,
		color: theme.colors.backgroundTertiary,
		padding: 5,
		borderRadius: 5,
		alignSelf: 'flex-start'
	},
	avatar: {
		width: 50,
		height: 50,
		marginRight: 25,
	},
	column: {
		flexDirection: 'column',
		gap: 5
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
	},
	statsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20
	}
});

export default RepositoryList;