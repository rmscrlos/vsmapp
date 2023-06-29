import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {useAppSelector} from '../redux/hook'
import Colors from '../constants/Colors'
import TaskCard from './TaskCard'

const TasksList = () => {
  const userTasks = useAppSelector((state) =>
    state.tasks.userTasks.filter((task) => task.status !== 'completed')
  )

  if (userTasks === undefined) return 'Loading...'

  if (userTasks.length === 0)
    return (
      <View style={styles.noTasks}>
        <Text style={styles.noTasksText}>No tasks yet..</Text>
      </View>
    )

  return (
    <View>
      {userTasks &&
        userTasks.map((task) => {
          const {status, dueDate, title, assignees, _id} = task

          return (
            <TaskCard
              key={_id}
              id={_id}
              status={status}
              dueDate={dueDate}
              title={title}
              assignees={assignees}
            />
          )
        })}
    </View>
  )
}

const styles = StyleSheet.create({
  noTasks: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
  },
  noTasksText: {
    fontSize: 20,
    fontFamily: 'PoppinsMediumItalic',
    color: Colors.secondaryColorLightShade,
  },
})

export default TasksList
