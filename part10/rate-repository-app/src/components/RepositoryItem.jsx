import { View, StyleSheet, Text, Image } from 'react-native';
import theme from '../theme';

const RepositoryItemMainInfo = ({ item }) => {
	return (
		<View style={styles.row}>
			<Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
			<View style={styles.column}>
				<Text testID="fullName" style={styles.textBold}>{item.fullName}</Text>
				<Text testID="description" style={styles.text}>{item.description}</Text>
				<Text testID="language" style={styles.language}>{item.language}</Text>
			</View>
		</View>
	);
}

const RepositoryItemStatsInfo = ({ item }) => {
	const formatCount = (num) => {
		if (num < 1000) return String(num);
		return (num / 1000).toFixed(1).replace('.0', '') + 'k';
	};

	return (
		<View style={styles.statsRow}>
			<View style={styles.statsColumn}>
				<Text testID="stargazersCount" style={styles.textBold}>{formatCount(item.stargazersCount)}</Text>
				<Text style={styles.text} >Stars</Text>
			</View>
			<View style={styles.statsColumn}>
				<Text testID="forksCount" style={styles.textBold}>{formatCount(item.forksCount)}</Text>
				<Text style={styles.text} >Forks</Text>
			</View>
			<View style={styles.statsColumn}>
				<Text testID="reviewCount" style={styles.textBold}>{item.reviewCount}</Text>
				<Text style={styles.text} >Reviews</Text>
			</View>
			<View style={styles.statsColumn}>
				<Text testID="ratingAverage" style={styles.textBold}>{item.ratingAverage}</Text>
				<Text style={styles.text} >Rating</Text>
			</View>
		</View>
	);
}

export const RepositoryItem = ({ item }) => {
	return (
		<View testID="repositoryItem" style={styles.listElement}>
			<RepositoryItemMainInfo item={item} />
			<RepositoryItemStatsInfo item={item} />
		</View>
	);
}

const styles = StyleSheet.create({
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
		flexShrink: 1,
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