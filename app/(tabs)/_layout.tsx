import {MaterialCommunityIcons} from '@expo/vector-icons/'
import {Tabs} from 'expo-router'
import {Text, StyleSheet, useColorScheme, View} from 'react-native'

import Colors from '../../constants/Colors'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name']
  color: string
}) {
  return <MaterialCommunityIcons size={28} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? 'dark'].background,
            height: 100,
            paddingHorizontal: 20,
          },
          headerShown: false,
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        }}
      >
        <Tabs.Screen
          name="Feed"
          options={{
            title: '',
            tabBarIcon: ({focused, color}) => (
              <View
                style={[styles.tabIconContainer, focused && {backgroundColor: Colors.offWhite}]}
              >
                <TabBarIcon
                  style={styles.icon}
                  name="crown"
                  color={focused ? Colors.navyBlue : color}
                />
                {focused && <Text style={styles.text}>Feed</Text>}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="Schedule"
          options={{
            title: '',
            tabBarIcon: ({focused, color}) => (
              <View
                style={[styles.tabIconContainer, focused && {backgroundColor: Colors.offWhite}]}
              >
                <TabBarIcon
                  style={styles.icon}
                  name="calendar"
                  color={focused ? Colors.navyBlue : color}
                />
                {focused && <Text style={styles.text}>Schedule</Text>}
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: '',
            tabBarIcon: ({focused, color}) => (
              <View
                style={[styles.tabIconContainer, focused && {backgroundColor: Colors.offWhite}]}
              >
                <TabBarIcon
                  style={styles.icon}
                  name="account"
                  color={focused ? Colors.navyBlue : color}
                />
                {focused && <Text style={styles.text}>Profile</Text>}
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  )
}

const styles = StyleSheet.create({
  tabIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  icon: {
    marginRight: 10,
  },
  text: {color: Colors.navyBlue, fontWeight: 'bold'},
  box: {
    height: 40,
    width: 40,
    backgroundColor: 'red',
    borderRadius: 5,
  },
})
