import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  boards: null,
  userBoards: [],
}

const boardsSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    getAllBoards: (state, action) => {
      state.boards = action.payload
    },
    getUserBoards: (state, action) => {
      state.userBoards = action.payload
    },
  },
})

export const {getUserBoards, getAllBoards} = boardsSlice.actions

export default boardsSlice.reducer
