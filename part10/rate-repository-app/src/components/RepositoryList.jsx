import { View, StyleSheet, FlatList, Text, Pressable } from 'react-native';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { RepositoryItem } from './RepositoryItem';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListElement = ({ item }) => {
	const navigate = useNavigate();

	return (
		<Pressable onPress={() => { navigate(item.id) }}>
			<RepositoryItem item={item} />
		</Pressable>
	);
};

const OrderSelectorComponent = ({ selectedOrder, setSelectedOrder }) => {
	return (
		<Picker
			selectedValue={selectedOrder}
			onValueChange={(itemValue, itemIndex) =>
				setSelectedOrder(itemValue)
			}>
			<Picker.Item label="Created At" value="CREATED_AT" />
			<Picker.Item label="Rating Average (Highest First)" value="RATING_AVERAGE" />
			<Picker.Item label="Rating Average (Lowest First)" value="RATING_AVERAGE_REVERSE" />
		</Picker>
	);
}

export const RepositoryListContainer = ({ repositories, selectedOrder, setSelectedOrder }) => {
	const repositoryNodes = repositories
		? repositories.map(edge => edge.node)
		: [];

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <RepositoryListElement item={item} />}
			keyExtractor={repository => repository.id}
			ListHeaderComponent={<OrderSelectorComponent selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />}
			style={styles.list}
		/>
	);
}

const RepositoryList = () => {
	const [selectedOrder, setSelectedOrder] = useState("CREATED_AT");
	const { repositories, loading, error } = useRepositories(selectedOrder);

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>Error: {error.message}</Text>;

	return <RepositoryListContainer repositories={repositories} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />;
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
