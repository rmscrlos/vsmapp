import React, {useEffect} from 'react'
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native'
import Screen from '../../components/Screen'
import Colors from '../../constants/Colors'
import UserHeader from '../../components/UserHeader'

import Greeting from '../../components/Greeting'
import {getMyAssignedBoards, getMyAssignedTasks} from '../../lib/sanityClient'
import {useAppSelector, useAppDispatch} from '../../redux/hook'
import {getUserTasks} from '../../redux/tasksSlice/tasks'
import {getUserBoards} from '../../redux/boardsSlice/boards'
import TasksList from '../../components/TasksList'

const Feed = () => {
  const [refreshing, setRefreshing] = React.useState(false)
  const dispatch = useAppDispatch()
  const {
    user: {uid},
  } = useAppSelector((state) => state.user)
  const userTasks = useAppSelector((state) => state.tasks.userTasks)
  const userBoards = useAppSelector((state) => state.boards.userBoards)
  const inCompleteTasks = userTasks.filter((task) => task.status !== 'completed')

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    const myTasks = await getMyAssignedTasks(uid)
    dispatch(getUserTasks(myTasks))

    const myBoards = await getMyAssignedBoards(uid)
    dispatch(getUserBoards(myBoards))

    setRefreshing(false)
  }, [])

  useEffect(() => {
    async function getTasks() {
      const myTasks = await getMyAssignedTasks(uid)
      dispatch(getUserTasks(myTasks))

      const myBoards = await getMyAssignedBoards(uid)
      dispatch(getUserBoards(myBoards))
    }
    getTasks()
  }, [uid])

  return (
    <Screen style={styles.container}>
      <UserHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Greeting />
        <View style={styles.taskContainer}>
          <View style={styles.indicators}>
            <View style={styles.indicator}>
              <View style={styles.pendingContainer}>
                <Text style={styles.number}>{inCompleteTasks.length}</Text>
              </View>
              <Text style={styles.tasksTitle}>Tasks</Text>
            </View>

            <View style={styles.indicator}>
              <View style={styles.pendingContainer}>
                <Text style={styles.number}>{userBoards.length}</Text>
              </View>
              <Text style={styles.tasksTitle}>Boards</Text>
            </View>
          </View>
        </View>

        <TasksList />
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navyBlue,
    padding: 20,
  },
  taskContainer: {},
  indicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tasksTitle: {
    fontSize: 35,
    fontFamily: 'PoppinsThin',
    color: Colors.offWhite,
  },
  pendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.offWhite,
    marginRight: 10,
    height: 20,
    width: 25,
    borderRadius: 8,
  },
  number: {
    fontSize: 15,
    fontFamily: 'PoppinsMedium',
  },
})

export default Feed
