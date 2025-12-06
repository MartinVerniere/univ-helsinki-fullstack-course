import { View, Text, StyleSheet } from 'react-native';
import { format } from "date-fns";
import theme from '../theme';

export const ReviewItem = ({ review, viewingReviewsMade = false }) => {
	const reviewItem = viewingReviewsMade
		? review.repository.fullName
		: review.user.username;

	return (
		<View style={styles.listElement}>
			<View style={styles.circleContainer}>
				<View style={styles.circle}>
					<Text style={styles.textBold}>{review.rating}</Text>
				</View>
			</View>
			<View style={styles.reviewContainer}>
				<Text style={styles.textBold}>{reviewItem}</Text>
				<Text style={styles.text}>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
				<Text style={styles.text}>{review.text}</Text>
			</View>
		</View>
	);
}

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