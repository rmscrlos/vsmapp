import {Stack, Link} from 'expo-router'
import React from 'react'
import Colors from '../../constants/Colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {Text, View} from 'react-native'

const _layout = () => {
  const GoBack = () => {
    return (
      <Link href="/Profile">
        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <MaterialCommunityIcons name="chevron-left" size={30} color={Colors.offWhite} />
          <Text style={{color: Colors.offWhite, fontFamily: 'PoppinsMedium', fontSize: 20}}>
            Back
          </Text>
        </View>
      </Link>
    )
  }

  return (
    <Stack>
      <Stack.Screen
        name="PastDue"
        options={{
          headerStyle: {backgroundColor: Colors.navyBlue},
          title: '',
          headerShadowVisible: false,
          headerLeft: () => <GoBack />,
        }}
      />

      <Stack.Screen
        name="Completed"
        options={{
          headerStyle: {backgroundColor: Colors.navyBlue},
          title: '',
          headerShadowVisible: false,
          headerLeft: () => <GoBack />,
        }}
      />
    </Stack>
  )
}

export default _layout
