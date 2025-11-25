import { Text, StyleSheet } from 'react-native';

export const FancyText = ({ isBlue, isBig, children }) => {
	const textStyles = [
		styles.text,
		isBlue && styles.blueText,
		isBig && styles.bigText,
	];

	return <Text style={textStyles}>{children}</Text>;
};

const styles = StyleSheet.create({
	text: {
		color: 'grey',
		fontSize: 14,
	},
	blueText: {
		color: 'blue',
	},
	bigText: {
		fontSize: 24,
		fontWeight: '700',
	},
});