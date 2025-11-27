import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const AppBarTab = ({ text }) => {
	return (
		<Pressable>
			<Text style={styles.text}>
				{text}
			</Text>
		</Pressable>
	);
}

const AppBar = () => {
	return (
		<View style={styles.container}>
			<AppBarTab text={"Repositories"} />
			{/* ... */}
		</View>
	);
};

export default AppBar;


const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.background,
	},
	text: {
		color: theme.colors.textTertiary
	}
	// ...
});