import { View, StyleSheet, FlatList, Text, Pressable } from 'react-native';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { RepositoryItem } from './RepositoryItem';
import { useNavigate } from 'react-router-native';

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListElement = ({ item }) => {
	const navigate = useNavigate();
	
	return (
		<Pressable onPress={() => {navigate(item.id)}}>
			<RepositoryItem item={item} />
		</Pressable>
	);
};

export const RepositoryListContainer = ({ repositories }) => {
	const repositoryNodes = repositories
		? repositories.map(edge => edge.node)
		: [];

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <RepositoryListElement item={item} />}
			keyExtractor={repository => repository.id}
			style={styles.list}
		/>
	);
}

const RepositoryList = () => {
	const { repositories, loading, error } = useRepositories();

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>Error: {error.message}</Text>;

	return <RepositoryListContainer repositories={repositories} />;
};

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
	list: {
		backgroundColor: theme.colors.backgroundSecondary
	},
});

export default RepositoryList;
