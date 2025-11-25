import { View, Text, StyleSheet } from 'react-native';

export const FlexboxExample = () => {
	return (
		<View style={styles.flexContainer}>
			<View style={styles.flexItemA}>
				<Text>Flex item A</Text>
			</View>
			<View style={styles.flexItemB}>
				<Text>Flex item B</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	flexContainer: {
		display: 'flex',
	},
	flexItemA: {
		flexGrow: 0,
		backgroundColor: 'green',
	},
	flexItemB: {
		flexGrow: 1,
		backgroundColor: 'blue',
	},
});