import { Redirect } from "expo-router";
import { View } from "react-native";

export default function Home() {
	return (
		<View>
			<Redirect href='/(tabs)/Feed' />
		</View>
	);
}
