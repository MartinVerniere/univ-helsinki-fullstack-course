import { useFormik } from "formik";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import theme from "../theme";

const initialValues = {
	username: '',
	password: '',
};

const SignIn = () => {
	const onSubmit = (values) => console.log("Tried logging in:", values.username, values.password)

	const formik = useFormik({
		initialValues,
		onSubmit,
	});

	return (
		<View style={styles.column}>
			<TextInput
				placeholder="Username"
				style={styles.input}
				value={formik.values.username}
				onChangeText={formik.handleChange('username')}
			/>
			<TextInput
				secureTextEntry
				placeholder="Password"
				style={styles.input}
				value={formik.values.password}
				onChangeText={formik.handleChange('password')}
			/>
			<Pressable onPress={formik.handleSubmit} style={styles.button}>
				<Text style={styles.text}>Sign in</Text>
			</Pressable>
		</View>
	);
};


const styles = StyleSheet.create({
	column: {
		flexDirection: 'column',
		gap: 10,
		padding: 10
	},
	input: {
		borderWidth: 1,
		padding: 10,
		borderRadius: 5,
		borderColor: theme.colors.textSecondary,
	},
	button: {
		backgroundColor: theme.colors.primary,
		padding: 10,
		alignItems: 'center'
	},
	text: {
		color: theme.colors.textTertiary,
		fontSize: theme.fontSizes.subheading,
		fontWeight: theme.fontWeights.bold
	}
});

export default SignIn;