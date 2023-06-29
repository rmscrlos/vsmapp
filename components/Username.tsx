import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Colors from '../constants/Colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'

type Props = {
  username: string
  role?: string
  style?: any
}

const getRoleBadge = (role: string | undefined) => {
  switch (role) {
    case 'Admin':
      return <MaterialCommunityIcons name="decagram" size={15} color={Colors.pastelGold} />
    case 'Staff':
      return <MaterialCommunityIcons name="decagram" size={15} color={Colors.pastelSilver} />
    default:
      return
  }
}

const Username = ({username, role, style}: Props) => {
  return (
    <View>
      <Text style={[styles.text, style]}>
        {username} {''}
        {getRoleBadge(role)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: Colors.secondaryColorLightShade,
    marginRight: 5,
    fontSize: 16,
    marginBottom: 5,
    alignItems: 'center',
  },
})

export default Username
