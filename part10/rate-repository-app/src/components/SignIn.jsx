import { useFormik } from "formik";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import theme from "../theme";
import * as yup from 'yup';
import { useSignIn } from "../hooks/useSignIn";

const initialValues = {
	username: '',
	password: '',
};

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.required('Username is required'),
	password: yup
		.string()
		.required('Password is required'),
});

const SignIn = () => {
	const [signIn] = useSignIn();

	const onSubmit = async (values) => {
		if (formik.isValid) {
			const { username, password } = values;
			
			try {
				const { data } = await signIn({ username, password });
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		};
	}

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});

	return (
		<View style={styles.column}>
			<TextInput
				placeholder="Username"
				style={formik.touched.username && formik.errors.username ? styles.inputError : styles.input}
				value={formik.values.username}
				onChangeText={formik.handleChange('username')}
			/>
			{formik.touched.username && formik.errors.username && (
				<Text style={styles.errorText}>{formik.errors.username}</Text>
			)}
			<TextInput
				secureTextEntry
				placeholder="Password"
				style={formik.touched.password && formik.errors.password ? styles.inputError : styles.input}
				value={formik.values.password}
				onChangeText={formik.handleChange('password')}
			/>
			{formik.touched.password && formik.errors.password && (
				<Text style={styles.errorText}>{formik.errors.password}</Text>
			)}
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
	inputError: {
		borderWidth: 1,
		padding: 10,
		borderRadius: 5,
		borderColor: theme.colors.error,
	},
	button: {
		backgroundColor: theme.colors.primary,
		padding: 10,
		alignItems: 'center'
	},
	text: {
		fontFamily: theme.fonts,
		fontSize: theme.fontSizes.subheading,
		color: theme.colors.textTertiary,
		fontWeight: theme.fontWeights.bold
	},
	errorText: {
		fontFamily: theme.fonts,
		fontSize: theme.fontSizes.body,
		color: theme.colors.error,
	}
});

export default SignIn;