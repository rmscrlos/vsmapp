import React, {useEffect} from 'react'
import {View, Text, StyleSheet, ScrollView, RefreshControl, Image} from 'react-native'
import Screen from '../../components/Screen'
import Colors from '../../constants/Colors'
import {auth} from '../../firebaseConfig'
import {signOut} from 'firebase/auth'
import Button from '../../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useAppDispatch, useAppSelector} from '../../redux/hook'
import {resetUserAction} from '../../redux/userSlice/user'
import {Link, useRouter} from 'expo-router'
import {MaterialCommunityIcons} from '@expo/vector-icons'

const Profile = () => {
  const [refreshing, setRefreshing] = React.useState(false)
  const {
    user: {photoURL, username, role},
  } = useAppSelector((state) => state.user)
  const userTasks = useAppSelector((state) => state.tasks.userTasks)
  const filteredTasks = userTasks.filter((task) => task.status !== 'completed')
  const completedTasks = userTasks.filter((task) => task.status === 'completed')

  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {}, [])

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  const handleSignOut = () => {
    AsyncStorage.removeItem('user')
    dispatch(resetUserAction())
    signOut(auth).then(() => {
      router.replace('/login')
    })
  }
  return (
    <Screen style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View>
          <View style={styles.userContainer}>
            <Image style={styles.userImage} source={{uri: photoURL}} alt="User Image" />
            <View style={styles.userInfo}>
              <Text style={styles.username}>{username}</Text>
              <View>
                <Text style={styles.role}>{role}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.userStats}>
          <View style={styles.userStat}>
            <MaterialCommunityIcons
              style={[styles.icon, {color: Colors.pastelRed}]}
              name="check-decagram"
              size={24}
            />
            <View>
              <Text style={styles.userTasksTitle}>Complete Tasks</Text>
              <Text style={styles.numberOfTasks}>{completedTasks.length}</Text>
            </View>
          </View>
          <View style={styles.userStat}>
            <MaterialCommunityIcons
              style={[styles.icon, {color: Colors.warningColor}]}
              name="alert-decagram"
              size={24}
            />
            <View>
              <Text style={styles.userTasksTitle}>Pending Tasks</Text>
              <Text style={styles.numberOfTasks}>{filteredTasks.length}</Text>
            </View>
          </View>
        </View>

        <View style={styles.otherSettings}>
          <Link href="(settings)/Completed">
            <View style={styles.setting}>
              <Text style={styles.settingText}>Completed Tasks!</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.offWhite} />
            </View>
          </Link>

          {role === 'Admin' && (
            <Link href="(settings)/PastDue">
              <View style={styles.setting}>
                <Text style={styles.settingText}>🪦 Past Due Tasks..</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.offWhite} />
              </View>
            </Link>
          )}
        </View>

        <Button style={styles.button} onPress={handleSignOut}>
          <Text>Sign Out</Text>
        </Button>
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navyBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  username: {
    color: Colors.offWhite,
    fontFamily: 'PoppinsMedium',
    fontSize: 25,
  },
  role: {
    color: Colors.secondaryColorLightShade,
    paddingVertical: 2,
    paddingHorizontal: 10,
    fontFamily: 'PoppinsMedium',
  },

  userStats: {
    marginVertical: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userStat: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    width: '43%',
    backgroundColor: Colors.secondaryColor,
    padding: 10,
    margin: 10,
  },
  icon: {
    marginRight: 10,
  },
  userTasksTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 12,
    marginBottom: 5,
    color: Colors.secondaryColorLightShade,
  },
  numberOfTasks: {
    color: Colors.offWhite,
    fontSize: 16,
    fontFamily: 'PoppinsSemiBold',
  },
  button: {
    marginTop: 20,
    backgroundColor: Colors.pastelRed,
  },
  otherSettings: {
    width: '90%',
    gap: 10,
  },

  setting: {
    backgroundColor: Colors.secondaryColor,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'space-between',
    width: '100%',
  },
  settingText: {
    color: Colors.offWhite,
    fontFamily: 'PoppinsSemiBold',
  },
})

export default Profile
