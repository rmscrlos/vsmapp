import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import {
	SafeAreaView,
	StyleSheet,
	View,
	StatusBarStyle,
	Platform,
} from "react-native";

interface ScreenProps {
	children: any;
	style?: any;
	barStyle?: StatusBarStyle;
}

const Screen = ({ children, style, barStyle = "default" }: ScreenProps) => {
	return (
		<>
			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
			<SafeAreaView style={[styles.screen, style]}>
				<View style={[styles.view, style]}>{children}</View>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	screen: {
		paddingTop: Constants.statusBarHeight,
		flex: 1,
	},
	view: {
		flexGrow: 1,
	},
});

export default Screen;
