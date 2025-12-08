import { View, StyleSheet, Text, FlatList, Pressable } from 'react-native';
import theme from '../theme';
import { RepositoryItem } from './RepositoryItem';
import * as Linking from 'expo-linking';
import useRepositoryDetails from '../hooks/useRepositoryDetails';
import { useParams } from 'react-router-native';
import { ReviewItem } from './ReviewItem';
import { ItemSeparator } from './ItemSeparator';

const RepositoryInfo = ({ repository }) => {
	return (
		<View style={styles.container}>
			<RepositoryItem item={repository} />
			<Pressable onPress={() => Linking.openURL(repository.url)} style={styles.button}>
				<Text style={styles.buttonText}>Open in GitHub</Text>
			</Pressable>
		</View>
	);
}

const RepositoryDetailsContainer = ({ repository, onEndReach }) => {
	const reviewNodes = repository
		? repository.reviews.edges.map(edge => edge.node)
		: [];

	return (
		<FlatList
			data={reviewNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <ReviewItem review={item} />}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
			onEndReached={onEndReach}
			onEndReachedThreshold={0.5}
			style={styles.list}
		/>
	);
}

export const RepositoryDetails = () => {
	const { id } = useParams();
	const { repository, fetchMore, loading, error } = useRepositoryDetails({
		id,
		first: 5
	});

	const onEndReach = () => {
		console.log("Fetching more");
		fetchMore();
	}

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>Error: {error.message}</Text>;

	return <RepositoryDetailsContainer repository={repository} onEndReach={onEndReach} />;
};

const styles = StyleSheet.create({
	circleContainer: {
		marginRight: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	circle: {
		width: 50,
		height: 50,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: theme.colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		backgroundColor: theme.colors.primary,
		padding: 12,
		borderRadius: 6,
		margin: 15,
		alignItems: 'center',
	},
	buttonText: {
		color: theme.colors.textTertiary,
		fontWeight: theme.fontWeights.bold,
		fontSize: theme.fontSizes.subheading,
	},
	list: {
		backgroundColor: theme.colors.backgroundSecondary
	},
	container: {
		backgroundColor: theme.colors.backgroundTertiary,
	},
	reviewContainer: {
		flexShrink: 1,
	},
	listElement: {
		flexDirection: 'row',
		backgroundColor: theme.colors.backgroundTertiary,
		padding: 10,
	},
	textBold: {
		fontWeight: theme.fontWeights.bold,
	},
	text: {
		marginTop: 5,
	},
});