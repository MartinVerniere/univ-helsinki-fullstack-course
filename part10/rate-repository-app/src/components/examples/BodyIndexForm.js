import { Text, TextInput, Pressable, View } from 'react-native';
import { useFormik } from 'formik';

const initialValues = {
	mass: '',
	height: '',
};

const getBodyMassIndex = (mass, height) => {
	return Math.round(mass / Math.pow(height, 2));
};

const BodyMassIndexForm = ({ onSubmit }) => {
	const formik = useFormik({
		initialValues,
		onSubmit,
	});

	return (
		<View>
			<TextInput
				placeholder="Weight (kg)"
				value={formik.values.mass}
				onChangeText={formik.handleChange('mass')}
			/>
			<TextInput
				placeholder="Height (m)"
				value={formik.values.height}
				onChangeText={formik.handleChange('height')}
			/>
			<Pressable onPress={formik.handleSubmit}>
				<Text>Calculate</Text>
			</Pressable>
		</View>
	);
};

const BodyMassIndexCalculator = () => {
	const onSubmit = values => {
		const mass = parseFloat(values.mass);
		const height = parseFloat(values.height);

		if (!isNaN(mass) && !isNaN(height) && height !== 0) {
			console.log(`Your body mass index is: ${getBodyMassIndex(mass, height)}`);
		}
	};

	return <BodyMassIndexForm onSubmit={onSubmit} />;
};

export default BodyMassIndexCalculator;