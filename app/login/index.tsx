import React, {useEffect, useState} from 'react'
import {StyleSheet} from 'react-native'
import Screen from '../../components/Screen'
import Colors from '../../constants/Colors'

import {Text, View} from '../../components/Themed'
import Button from '../../components/Button'
import {AntDesign} from '@expo/vector-icons'

import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import {GoogleAuthProvider, signInWithCredential} from 'firebase/auth'
import {auth} from '../../firebaseConfig'
import {createUser, getUser} from '../../lib/sanityClient'
import {useDispatch} from 'react-redux'
import {setUserAction} from '../../redux/userSlice/user'
import AsyncStorage from '@react-native-async-storage/async-storage'

WebBrowser.maybeCompleteAuthSession()

const LoginScreen = () => {
  const dispatch = useDispatch()
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '895576978845-s63s6nvu2vq14j9phinacgd9ei0ci6o9.apps.googleusercontent.com',
    selectAccount: true,
  })

  useEffect(() => {
    handleEffect()
  }, [response])

  async function handleEffect() {
    if (response) {
      if (response?.type === 'success') {
        const tk = response?.authentication?.accessToken
        const cred = GoogleAuthProvider.credential(null, tk)
        await signInWithCredential(auth, cred).then(async (user) => {
          const {displayName, email, photoURL, uid} = user.user
          const isUserCreated = await getUser(uid)

          if (isUserCreated === null) {
            createUser(displayName, uid, email, photoURL).then((res) => {
              const {username, email, photoURL, uid, role, _id} = res
              dispatch(setUserAction({username, email, photoURL, uid, role, _id}))
              AsyncStorage.setItem(
                'user',
                JSON.stringify({username, email, photoURL, uid, role, _id})
              )
            })
          } else {
            dispatch(setUserAction(isUserCreated))
            AsyncStorage.setItem('user', JSON.stringify(isUserCreated))
          }
        })
      }
    }
  }

  return (
    <Screen style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.checkIconContainer}>
          <AntDesign style={styles.checkIcon} name="check" size={24} color={Colors.navyBlue} />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.text}>
          <Text style={styles.welcomeText}>
            Welcome to <Text style={styles.title}>tsk.</Text>
          </Text>
          <Text style={styles.subTitle}>Log in to start checking off your tsks.</Text>
        </View>
        <View>
          <Button style={styles.googleButton} onPress={() => promptAsync()}>
            <AntDesign style={styles.icon} name="google" size={24} color={Colors.navyBlue} />
            <Text colorName="navyBlue">Sign In with Google..</Text>
          </Button>
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.navyBlue,
  },
  checkIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    width: 120,
    backgroundColor: Colors.offWhite,
    borderRadius: 30,
  },
  topContainer: {},
  checkIcon: {
    fontSize: 50,
  },
  bottomContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    marginBottom: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 30,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'PoppinsExtraBold',
  },
  subTitle: {
    fontSize: 16,
  },
  googleButton: {
    height: 60,
    width: 250,
    margin: 10,
    backgroundColor: Colors.offWhite,
  },
  icon: {
    marginRight: 10,
  },
})

export default LoginScreen
