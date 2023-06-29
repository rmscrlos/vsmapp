import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Screen from "../../components/Screen";
import Colors from "../../constants/Colors";

const Feed = () => {
	return (
		<Screen style={styles.container}>
			<Text style={styles.text}>Schedule</Text>
		</Screen>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.navyBlue,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: "white",
	},
});

export default Feed;
