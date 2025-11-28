import { Platform, Text, StyleSheet } from 'react-native';

export const WhatIsMyPlatform = () => {
	return <Text style={styles.text}>Your platform is: {Platform.OS}</Text>;
};

const styles = StyleSheet.create({
	text: {
		color: Platform.select({
			android: 'green',
			ios: 'blue',
			default: 'black',
		}),
	},
});