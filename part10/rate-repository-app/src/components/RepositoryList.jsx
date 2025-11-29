import { View, StyleSheet, FlatList, Text, Image } from 'react-native';
import theme from '../theme';
import { useState, useEffect } from 'react';
import useRepositories from '../hooks/useRepositories';

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
			<View style={styles.statsColumn}>
				<Text style={styles.textBold}>{formatCount(item.stargazersCount)}</Text>
				<Text style={styles.text} >Stars</Text>
			</View>
			<View style={styles.statsColumn}>
				<Text style={styles.textBold}>{formatCount(item.forksCount)}</Text>
				<Text style={styles.text} >Forks</Text>
			</View>
			<View style={styles.statsColumn}>
				<Text style={styles.textBold}>{item.reviewCount}</Text>
				<Text style={styles.text} >Reviews</Text>
			</View>
			<View style={styles.statsColumn}>
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
	const { repositories } = useRepositories();

	// Get the nodes from the edges array
	const repositoryNodes = repositories
		? repositories.edges.map(edge => edge.node)
		: [];

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <RepositoryItem item={item} />}
			keyExtractor={repository => repository.id}
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
		fontFamily: theme.fonts,
		fontSize: theme.fontSizes.body,
		fontWeight: theme.fontWeights.normal,
		color: theme.colors.textSecondary,
	},
	textBold: {
		fontFamily: theme.fonts,
		fontSize: theme.fontSizes.subheading,
		fontWeight: theme.fontWeights.bold,
		color: theme.colors.textPrimary,
	},
	language: {
		fontVariant: theme.fonts,
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
	},
	statsColumn: {
		flexDirection: 'column',
		gap: 5,
		alignItems: 'center'
	},
});

export default RepositoryList;
