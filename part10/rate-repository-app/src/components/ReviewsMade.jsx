import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import useMe from "../hooks/useMe";
import { ReviewItem } from "./ReviewItem";
import { ItemSeparator } from "./ItemSeparator";
import theme from "../theme";
import { useReview } from "../hooks/useReview";
import { useNavigate } from 'react-router-native';

const ReviewMadeItem = ({ review, viewingReviewsMade }) => {
	const { deleteReview } = useReview();
	const navigate = useNavigate();

	const showAlert = (reviewId) => Alert.alert(
		'Delete review',
		'Are you sure you want to delete this review',
		[
			{
				text: 'CANCEL',
				onPress: () => console.log("Canceled delete"),
				style: 'cancel',
			},
			{
				text: 'DELETE',
				onPress: () => deleteReview(reviewId),
				style: 'cancel',
			},
		],
		{
			cancelable: true,
			onDismiss: () =>console.log("Alert dismissed"),
		},
	);

	return (
		<View style={styles.reviewMadeItem}>
			<ReviewItem review={review} viewingReviewsMade={viewingReviewsMade} />
			<View style={styles.buttonList}>
				<Pressable style={styles.viewRepoButton} onPress={() => { navigate(`/repositories/${review.repository.id}`) }}>
					<Text style={styles.buttonText}>
						View Repository
					</Text>
				</Pressable>
				<Pressable style={styles.deleteButton} onPress={() => { showAlert(review.id); }}>
					<Text style={styles.buttonText}>
						Delete Review
					</Text>
				</Pressable>
			</View>
		</View>
	)

}

const ReviewsMadeContainer = ({ userDetails }) => {
	const reviewNodes = userDetails
		? userDetails.reviews.edges.map(edge => edge.node)
		: [];

	return (
		<FlatList
			data={reviewNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <ReviewMadeItem review={item} viewingReviewsMade={true} />}
			keyExtractor={repository => repository.id}
			style={styles.list}
		/>
	);
}

export const ReviewsMade = () => {
	const { data, loading, error } = useMe(true);

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>Error: {error.message}</Text>;

	const userDetails = data.me;

	return <ReviewsMadeContainer userDetails={userDetails} />
}

const styles = StyleSheet.create({
	list: {
		backgroundColor: theme.colors.backgroundSecondary
	},
	reviewMadeItem: {
		backgroundColor: theme.colors.backgroundTertiary
	},
	buttonList: {
		flex: 1,
		gap: 10,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	viewRepoButton: {
		backgroundColor: theme.colors.primary,
		borderRadius: 5,
		paddingHorizontal: 25,
		paddingVertical: 15,
		alignItems: 'center'
	},
	deleteButton: {
		backgroundColor: theme.colors.error,
		borderRadius: 5,
		paddingHorizontal: 25,
		paddingVertical: 15,
		alignItems: 'center'
	},
	buttonText: {
		color: theme.colors.textTertiary,
		fontWeight: theme.fontWeights.bold
	}
});