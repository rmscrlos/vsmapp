import React, {useEffect} from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '../firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useAppSelector, useAppDispatch} from '../redux/hook'
import {setUserAction} from '../redux/userSlice/user'

export function useUserSignedIn() {
  const {user} = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      if (user) {
        return dispatch(setUserAction(JSON.parse(user)))
      }
    })

    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, async (isSignedIn) => {
      if (isSignedIn) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const storedUser = await AsyncStorage.getItem('user')
        dispatch(setUserAction(JSON.parse(storedUser || '')))
      } else {
        // User is signed out
        dispatch(setUserAction({}))
      }
    })

    return unsubscribeFromAuthStatuChanged
  }, [])

  return {
    user,
  }
}
