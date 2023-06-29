import {createSlice} from '@reduxjs/toolkit'
import {UserType} from '../../types'

const initialState = {
  user: {} as UserType,
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserAction: (state, action) => {
      state.user = action.payload
    },
    resetUserAction: (state) => {
      state.user = {} as UserType
    },
  },
})

export const {setUserAction, resetUserAction} = userSlice.actions

export default userSlice.reducer
