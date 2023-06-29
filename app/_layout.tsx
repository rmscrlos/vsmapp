import {useEffect, useState} from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native'
import {useColorScheme} from 'react-native'
import {useFonts} from 'expo-font'
import {SplashScreen, Stack} from 'expo-router'

import LoginScreen from './login/index'
import {useUserSignedIn} from '../lib/useUserSignedIn'
import Colors from '../constants/Colors'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export default function RootLayout() {
  const {user} = useUserSignedIn()

  const [loaded, error] = useFonts({
    PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsThin: require('../assets/fonts/Poppins-Thin.ttf'),
    PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsMediumItalic: require('../assets/fonts/Poppins-MediumItalic.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsExtraBold: require('../assets/fonts/Poppins-ExtraBold.ttf'),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && user?.uid ? <RootLayoutNav /> : <LoginScreen />}
    </>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen
          name="(tasks)"
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen name="(settings)" options={{headerShown: false}} />
      </Stack>
    </ThemeProvider>
  )
}
