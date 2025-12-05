import { useFormik } from "formik";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import theme from "../theme";
import * as yup from 'yup';
import { useSignIn } from "../hooks/useSignIn";
import { useNavigate } from "react-router";
import { useSignUp } from "../hooks/useSignUp";

const initialValues = {
	username: '',
	password: '',
	passwordConfirm: '',
};

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.required('Username is required'),
	password: yup
		.string()
		.required('Password is required'),
	passwordConfirm: yup.string()
		.oneOf([yup.ref('password'), 'Passwords must match'])
		.required('Password confirm is required'),
});

export const SignInContainer = ({ formik, onSubmit }) => {
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
			<TextInput
				secureTextEntry
				placeholder="Password Confirm"
				style={formik.touched.passwordConfirm && formik.errors.passwordConfirm ? styles.inputError : styles.input}
				value={formik.values.passwordConfirm}
				onChangeText={formik.handleChange('passwordConfirm')}
			/>
			{formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
				<Text style={styles.errorText}>{formik.errors.passwordConfirm}</Text>
			)}
			<Pressable onPress={onSubmit} style={styles.button}>
				<Text style={styles.text}>Sign in</Text>
			</Pressable>
		</View>
	);
}

const SignIn = () => {
	const [signUp] = useSignUp();
	const [signIn] = useSignIn();
	let navigate = useNavigate();

	const onSubmit = async (values) => {
		if (formik.isValid) {
			const { username, password } = values;
			console.log("Sign in:", values);

			try {
				const { data } = await signUp({ username, password });
				console.log(data);
				await signIn({ username, password });
				navigate('/');
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

	return <SignInContainer formik={formik} onSubmit={formik.handleSubmit} />;
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