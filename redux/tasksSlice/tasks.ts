import {createSlice} from '@reduxjs/toolkit'
import {TaskType} from '../../types'

const initialState = {
  tasks: null,
  userTasks: [] as TaskType[],
  task: {} as TaskType,
}

const tasksSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    getAllTasks: (state, action) => {
      state.tasks = action.payload
    },
    getUserTasks: (state, action) => {
      state.userTasks = action.payload
    },
    updateTaskStatus: (state, action) => {
      const {id, status} = action.payload
      const taskToUpdate = state.userTasks.find((task) => task._id === id)
      if (taskToUpdate) taskToUpdate.status = status
    },
    addCommentToTask: (state, action) => {
      const {id, comment} = action.payload
      const task = state.userTasks.find((task) => task._id === id)

      if (task?._id === id) {
        task?.comments.push(comment)
      }
    },
    addReviewer: (state, action) => {
      const {taskId, username} = action.payload
      const task = state.userTasks.find((task) => task._id === taskId)

      if (task?._id === taskId) {
        task?.reviewers.push({username})
      }
    },
    refreshTasks: (state) => {
      return state
    },
  },
})

export const {
  getAllTasks,
  getUserTasks,
  updateTaskStatus,
  addCommentToTask,
  addReviewer,
  refreshTasks,
} = tasksSlice.actions

export default tasksSlice.reducer
