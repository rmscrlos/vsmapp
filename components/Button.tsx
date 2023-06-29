import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import { StyleType } from "../types";

type ButtonProps = {
	style?: StyleType;
	children?: React.ReactNode;
	onPress?: () => void;
};

const Button = ({ children, style, onPress }: ButtonProps) => {
	return (
		<Pressable onPress={onPress} style={[styles.container, style]}>
			{children}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		backgroundColor: Colors.navyBlue,
		flexDirection: "row",
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
	},
});
export default Button;
