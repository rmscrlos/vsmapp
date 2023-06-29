import React from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import Colors from '../../constants/Colors'
import Screen from '../../components/Screen'
import {useAppSelector} from '../../redux/hook'
import TaskCard from '../../components/TaskCard'

const PastDue = () => {
  const tasks = useAppSelector((state) => state.tasks.userTasks)
  const pastDueTasks = tasks.filter(
    (task) => new Date(task.dueDate) < new Date() && task.status !== 'completed'
  )

  return (
    <Screen style={styles.contianer}>
      <View>
        <Text style={styles.title}>Past Due Tasks</Text>
      </View>
      <View>
        <FlatList
          data={pastDueTasks}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => {
            const {status, dueDate, title, assignees, _id} = item

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
          }}
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: Colors.navyBlue,
    padding: 20,
  },
  title: {
    color: Colors.offWhite,
    fontSize: 30,
    fontFamily: 'PoppinsSemiBold',
  },
})

export default PastDue
