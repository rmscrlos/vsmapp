/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
	Text as DefaultText,
	useColorScheme,
	View as DefaultView,
} from "react-native";

import Colors from "../constants/Colors";

type colorNameType = keyof typeof Colors.light &
	keyof typeof Colors.dark &
	keyof typeof Colors;

export function useThemeColor(
	props: { light?: string; dark?: string },
	colorName: colorNameType
) {
	const theme = useColorScheme() ?? "light";
	const colorFromProps = props[theme];

	if (colorFromProps) {
		return colorFromProps;
	} else {
		return Colors[colorName] || Colors[theme][colorName];
	}
}

function getKeyByValue(obj: { [key: string]: any }, value: any): colorNameType {
	for (const key in obj) {
		if (obj.hasOwnProperty(key) && obj[key] === value) {
			return key as colorNameType;
		}
	}

	return value as colorNameType;
}

type ThemeProps = {
	lightColor?: string;
	darkColor?: string;
	colorName?: colorNameType | string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function Text(props: TextProps) {
	const {
		style,
		lightColor,
		darkColor,
		colorName = "text",
		...otherProps
	} = props;
	const name = getKeyByValue(Colors, colorName) || colorName;
	const color = useThemeColor({ light: lightColor, dark: darkColor }, name);

	return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
	const {
		style,
		lightColor,
		darkColor,
		colorName = "background",
		...otherProps
	} = props;
	const name = getKeyByValue(Colors, colorName) || colorName;
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		name
	);

	return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
