import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router';
import theme from '../theme';
import { useReview } from '../hooks/useReview';

const ReviewFormContainer = ({ formik, onSubmit }) => {
	return (
		<View style={styles.column}>
			<TextInput
				placeholder="Repository owner name"
				style={formik.touched.username && formik.errors.username ? styles.inputError : styles.input}
				value={formik.values.username}
				onChangeText={formik.handleChange('username')}
			/>
			{formik.touched.username && formik.errors.username && (
				<Text style={styles.errorText}>{formik.errors.username}</Text>
			)}
			<TextInput
				placeholder="Repository name"
				style={formik.touched.name && formik.errors.name ? styles.inputError : styles.input}
				value={formik.values.name}
				onChangeText={formik.handleChange('name')}
			/>
			{formik.touched.name && formik.errors.name && (
				<Text style={styles.errorText}>{formik.errors.name}</Text>
			)}
			<TextInput
				placeholder="Rating between 0 and 100"
				style={formik.touched.rating && formik.errors.rating ? styles.inputError : styles.input}
				value={formik.values.rating}
				onChangeText={formik.handleChange('rating')}
			/>
			{formik.touched.rating && formik.errors.rating && (
				<Text style={styles.errorText}>{formik.errors.rating}</Text>
			)}
			<TextInput
				placeholder="Review"
				multiline
				value={formik.values.review}
				onChangeText={formik.handleChange('review')}
			/>
			{formik.touched.review && formik.errors.review && (
				<Text style={styles.errorText}>{formik.errors.review}</Text>
			)}
			<Pressable onPress={onSubmit} style={styles.button}>
				<Text style={styles.text}>Create a review</Text>
			</Pressable>
		</View>
	);
}

export const ReviewForm = () => {
	const [addReview] = useReview();
	let navigate = useNavigate();

	const initialValues = {
		username: '',
		name: '',
		rating: '',
		review: '',
	};

	const validationSchema = yup.object().shape({
		username: yup
			.string()
			.required('Repository owner name is required'),
		name: yup
			.string()
			.required('Repository name is required'),
		rating: yup
			.number()
			.min(0, 'Rating must be greater or equal to 0')
			.max(100, 'Rating must be less than or equal to 100')
			.required('Rating is required'),
		review: yup
			.string()
			.optional(),
	});

	const onSubmit = async (values) => {
		if (formik.isValid) {
			console.log("Adding review:", values);
			const { username, name, rating, review } = values;

			try {
				const { data } = await addReview({ username, name, rating: Number(rating), review });
				console.log(data);
				const repositoryId = data.createReview.repositoryId;
				navigate(`/repository/${repositoryId}`);
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

	return <ReviewFormContainer formik={formik} onSubmit={formik.handleSubmit} />;
}

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