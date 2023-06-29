import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {useAppSelector} from '../redux/hook'
import Colors from '../constants/Colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'

const UserHeader = () => {
  const {user} = useAppSelector((state) => state.user)

  const name = user.username?.substring(0, user.username.indexOf(' '))
  return (
    <View style={styles.header}>
      <View>
        <View>
          <Text style={styles.nameContainer}>
            Hi, <Text style={styles.name}>{name}</Text> 👋
          </Text>
        </View>
      </View>
      <View style={{position: 'relative'}}>
        <View style={styles.numberOfNotifications}>
          <Text
            style={{
              color: Colors.offWhite,
              fontSize: 10,
              textAlign: 'center',
            }}
          >
            {/* TODO: Number of pending tasks that are about to expire */}1
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons style={{color: Colors.offWhite}} size={30} name="bell" />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  nameContainer: {
    color: Colors.offWhite,
    fontSize: 25,
  },
  name: {
    fontWeight: 'bold',
  },
  photo: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondaryColor,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  numberOfNotifications: {
    position: 'absolute',
    zIndex: 2,
    bottom: -10,
    right: 15,
    width: 20,
    height: 15,
    borderRadius: 50,
    backgroundColor: Colors.pastelRed,
    justifyContent: 'center',
  },
})

export default UserHeader
