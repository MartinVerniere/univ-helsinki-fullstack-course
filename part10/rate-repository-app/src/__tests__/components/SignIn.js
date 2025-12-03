import { Pressable, Text, TextInput, View } from "react-native";
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { useState } from "react";

const LoginForm = ({ onSubmit }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = () => {
		onSubmit({ username, password });
	};

	return (
		<View>
			<View testID="usernameField">
				<TextInput placeholder="Username" value={username} onChangeText={setUsername} />
			</View>
			<View testID="passwordField">
				<TextInput placeholder="Password" value={password} onChangeText={setPassword} />
			</View>
			<View testID="submitButton">
				<Pressable onPress={handleSubmit}>
					<Text>Sign in</Text>
				</Pressable>
			</View>
		</View>
	);
}

describe('SignIn', () => {
	describe('SignInContainer', () => {
		it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {

			const onSubmit = jest.fn();
			render(<LoginForm onSubmit={onSubmit} />);

			fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
			fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
			fireEvent.press(screen.getByText('Sign in'));

			await waitFor(() => {
				expect(onSubmit).toHaveBeenCalledTimes(1);
				expect(onSubmit.mock.calls[0][0]).toEqual({
					username: 'kalle',
					password: 'password',
				});
			});
		});
	});
});