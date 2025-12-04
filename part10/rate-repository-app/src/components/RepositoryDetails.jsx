import { View, StyleSheet, Button, Text } from 'react-native';
import theme from '../theme';
import { RepositoryItem } from './RepositoryItem';
import * as Linking from 'expo-linking';
import useRepositoryDetails from '../hooks/useRepositoryDetails';
import { useParams } from 'react-router-native';

const RepositoryDetailsContainer = ({ repository }) => {
	return (
		<View style={styles.page}>
			<View style={styles.container}>
				<RepositoryItem item={repository} />
				<Button title="Open in GitHub" onPress={() => Linking.openURL(repository.url)} style={styles.githubButton} />
			</View>
		</View>
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
	githubButton: {
		fontVariant: theme.fonts,
		backgroundColor: theme.colors.primary,
		color: theme.colors.backgroundTertiary,
		padding: 5,
		borderRadius: 5,
	},
	page: {
		backgroundColor: theme.colors.backgroundSecondary
	},
});