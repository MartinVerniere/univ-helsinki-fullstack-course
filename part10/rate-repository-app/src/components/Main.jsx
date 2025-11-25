import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import { FancyText } from './FancyText';

const styles = StyleSheet.create({
	container: {
		marginTop: Constants.statusBarHeight,
		flexGrow: 1,
		flexShrink: 1,
	},
});

const Main = () => {
	return (
		<View style={styles.container}>
			<Text>Rate Repository Application</Text>
			<FancyText>Simple text</FancyText>
			<FancyText isBlue>Blue text</FancyText>
			<FancyText isBig>Big text</FancyText>
			<FancyText isBig isBlue>
				Big blue text
			</FancyText>
			<RepositoryList />
		</View>
	);
};

export default Main;