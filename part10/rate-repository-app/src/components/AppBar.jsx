import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import useMe from '../hooks/useMe';
import { useSignOut } from '../hooks/useSignOut';

const AppBarTab = ({ text, linkTo }) => {
	return (
		<Link to={linkTo}>
			<Text style={styles.text}>
				{text}
			</Text>
		</Link>
	);
}

const AppBarButton = ({ text, onPress }) => {
	return (
		<Pressable onPress={onPress}>
			<Text style={styles.text}>
				{text}
			</Text>
		</Pressable>
	);
}

const ShowOnlyLoggedInTabs = ({ logout }) => {
	return (
		<>
			<AppBarTab text={"Create a review"} linkTo={"/repositories/create-review"} />
			<AppBarButton text={"Sign out"} onPress={logout} />
		</>
	);
}

const ShowOnlyLoggedOutTabs = () => {
	return (
		<>
			<AppBarTab text={"Sign in"} linkTo={"/signIn"} />
			<AppBarTab text={"Sign up"} linkTo={"/signUp"} />
		</>
	);
}

const AppBar = () => {
	const [signOut] = useSignOut();
	const { data } = useMe();

	const me = data
		? data.me
		: null;

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scroll} horizontal>
				<AppBarTab text={"Repositories"} linkTo={"/repositories"} />
				{me
					? <ShowOnlyLoggedInTabs logout={signOut} />
					: <ShowOnlyLoggedOutTabs />
				}
			</ScrollView>
		</View>
	);
};

export default AppBar;

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.background,
	},
	scroll: {
		flexDirection: 'row',
		gap: 10,
		paddingHorizontal: 10
	},
	text: {
		color: theme.colors.textTertiary
	}
});