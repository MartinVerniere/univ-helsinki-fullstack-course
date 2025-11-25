import { Text, Pressable, Alert } from 'react-native';

export const PressableText = () => {
	return (
		<Pressable
			onPress={() => Alert.alert('You pressed the text!')}
		>
			<Text>You can press me</Text>
		</Pressable>
	);
};