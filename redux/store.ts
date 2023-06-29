import {configureStore} from '@reduxjs/toolkit'
import userSliceReducer from './userSlice/user'
import tasksSliceReducer from './tasksSlice/tasks'
import boardsSliceReducer from './boardsSlice/boards'

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    tasks: tasksSliceReducer,
    boards: boardsSliceReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
