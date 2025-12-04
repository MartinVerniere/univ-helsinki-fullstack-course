import { View, StyleSheet, Button, Text, FlatList, Pressable } from 'react-native';
import theme from '../theme';
import { RepositoryItem } from './RepositoryItem';
import * as Linking from 'expo-linking';
import useRepositoryDetails from '../hooks/useRepositoryDetails';
import { useParams } from 'react-router-native';
import { format } from "date-fns";

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
	return (
		<View style={styles.listElement}>
			<View style={styles.circleContainer}>
				<View style={styles.circle}>
					<Text style={styles.textBold}>{review.rating}</Text>
				</View>
			</View>
			<View style={styles.reviewContainer}>
				<Text style={styles.textBold}>{review.user.username}</Text>
				<Text style={styles.text}>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
				<Text style={styles.text}>{review.text}</Text>
			</View>
		</View>
	);
}

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

const RepositoryDetailsContainer = ({ repository }) => {
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
			style={styles.list}
		/>
	);
}

export const RepositoryDetails = () => {
	const { id } = useParams();
	const { repository, loading, error } = useRepositoryDetails(id);

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>Error: {error.message}</Text>;

	return <RepositoryDetailsContainer repository={repository} />;
};

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
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