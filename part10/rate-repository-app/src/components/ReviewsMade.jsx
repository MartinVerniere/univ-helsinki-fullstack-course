import { FlatList, StyleSheet, Text } from "react-native";
import useMe from "../hooks/useMe";
import { ReviewItem } from "./ReviewItem";
import { ItemSeparator } from "./ItemSeparator";
import theme from "../theme";

const ReviewsMadeContainer = ({ userDetails }) => {
	const reviewNodes = userDetails.reviews.edges
		? userDetails.reviews.edges.map(edge => edge.node)
		: [];

	console.log("reviewNodes:", reviewNodes);

	return (
		<FlatList
			data={reviewNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <ReviewItem review={item} viewingReviewsMade={true} />}
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
});