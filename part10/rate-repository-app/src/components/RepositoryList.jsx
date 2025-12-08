import { View, StyleSheet, FlatList, Text, Pressable, TextInput } from 'react-native';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { RepositoryItem } from './RepositoryItem';
import { useNavigate } from 'react-router-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import { ItemSeparator } from './ItemSeparator';

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
			onValueChange={(itemValue) =>
				setSelectedOrder(itemValue)
			}>
			<Picker.Item label="Created At" value="CREATED_AT" />
			<Picker.Item label="Rating Average (Highest First)" value="RATING_AVERAGE" />
			<Picker.Item label="Rating Average (Lowest First)" value="RATING_AVERAGE_REVERSE" />
		</Picker>
	);
}

const RepositorySearchBar = ({ selectedQuery, setSelectedQuery }) => {
	return (
		<View style={styles.searchBarContainer}>
			<TextInput
				placeholder="Search a repository..."
				style={styles.searchBar}
				value={selectedQuery}
				onChangeText={text => setSelectedQuery(text)}
			/>
		</View>
	);
}

export class RepositoryListContainer extends React.Component {
	renderHeader = () => {
		const { selectedQuery, setSelectedQuery, selectedOrder, setSelectedOrder } = this.props;
		return (
			<>
				<RepositorySearchBar selectedQuery={selectedQuery} setSelectedQuery={setSelectedQuery} />
				<OrderSelectorComponent selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
			</>
		);
	};

	render() {
		const { repositories, onEndReach } = this.props;
		const repositoryNodes = repositories
			? repositories.map(edge => edge.node)
			: [];

		return (
			<FlatList
				data={repositoryNodes}
				ItemSeparatorComponent={ItemSeparator}
				renderItem={({ item }) => <RepositoryListElement item={item} />}
				keyExtractor={repository => repository.id}
				ListHeaderComponent={this.renderHeader}
				onEndReached={onEndReach}
				onEndReachedThreshold={0.5}
				style={styles.list}
			/>
		);
	}
}

const RepositoryList = () => {
	const [selectedOrder, setSelectedOrder] = useState("CREATED_AT");
	const [selectedQuery, setSelectedQuery] = useState("");
	const [debouncedQuery] = useDebounce(selectedQuery, 500);

	const sortingOrder = selectedOrder === "CREATED_AT"
		? "CREATED_AT"
		: "RATING_AVERAGE";

	const sortingOrderAscending = selectedOrder === "RATING_AVERAGE_REVERSE"
		? "ASC"
		: "DESC";

	const { repositories, fetchMore, loading, error } = useRepositories({
		searchKeyword: debouncedQuery,
		orderBy: sortingOrder,
		orderDirection: sortingOrderAscending,
		first: 8
	});

	const onEndReach = () => {
		console.log("Fetching more");
		fetchMore();
	}

	if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>Error: {error.message}</Text>;

	return <RepositoryListContainer
		repositories={repositories}
		onEndReach={onEndReach}
		selectedQuery={selectedQuery}
		setSelectedQuery={setSelectedQuery}
		selectedOrder={selectedOrder}
		setSelectedOrder={setSelectedOrder}
	/>;
};

const styles = StyleSheet.create({
	list: {
		backgroundColor: theme.colors.backgroundSecondary
	},
	searchBarContainer: {
		backgroundColor: theme.colors.backgroundSecondary
	},
	searchBar: {
		borderRadius: 5,
		backgroundColor: theme.colors.backgroundTertiary,
		padding: 10,
		margin: 20,
	}
});

export default RepositoryList;
