import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';

const AppBarTab = ({ text, linkTo }) => {
	return (
		<Link to={linkTo}>
			<Text style={styles.text}>
				{text}
			</Text>
		</Link>
	);
}

const AppBar = () => {
	return (
		<View style={styles.container}>
			<AppBarTab text={"Repositories"} linkTo={"/"}/>
			<AppBarTab text={"Sign in"} linkTo={"/signIn"}/>
		</View>
	);
};

export default AppBar;


const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.background,
		flexDirection: 'row',
		gap: 10
	},
	text: {
		color: theme.colors.textTertiary
	}
	// ...
});