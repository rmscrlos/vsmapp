import React from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {View, Text, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native'
import {getStatusColor} from '../lib/taskHelpers'
import {getDueDateStatus} from '../lib/datesHelpers'
import Colors from '../constants/Colors'
import {useRouter} from 'expo-router'

type TaskCardProps = {
  status: string
  dueDate: Date
  title: string
  assignees: []
  id: string
}

const TaskCard = ({status, dueDate, title, assignees, id}: TaskCardProps) => {
  const router = useRouter()
  const date = new Date(dueDate)
  const month = date.toLocaleString('default', {month: 'short'})
  const day = date.getDate()

  const handleRoute = () => {
    router.push(`/${id}`)
  }

  return (
    <TouchableWithoutFeedback onPress={handleRoute}>
      <View style={styles.taskCard}>
        <View style={styles.cardTitle}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.status, getStatusColor(status)]}>{status}</Text>
        </View>

        <View>
          <Text style={styles.assigned}>Assigned:</Text>
          <View style={styles.assignedUsersPhoto}>
            {assignees &&
              assignees.map((assignee: any) => (
                <Image
                  style={styles.userImage}
                  source={{uri: assignee.photoURL}}
                  alt="Assigned User Image"
                />
              ))}
          </View>
        </View>

        <View style={styles.dueDateContainer}>
          {getDueDateStatus(dueDate) !== 'past due..' ? (
            <MaterialCommunityIcons
              style={{
                color:
                  getDueDateStatus(dueDate) === 'Today'
                    ? Colors.pastelRed
                    : getDueDateStatus(dueDate) === 'Tomorrow'
                    ? Colors.warningColor
                    : Colors.pastelGreen,
              }}
              name="clock"
              size={22}
            />
          ) : (
            <Text>🪦</Text>
          )}
          <Text style={styles.dueDate}>{getDueDateStatus(dueDate)}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  taskCard: {
    marginVertical: 10,
    backgroundColor: Colors.secondaryColor,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
    height: 180,
  },
  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'PoppinsMedium',
    color: Colors.offWhite,
  },
  status: {
    fontSize: 15,
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  assigned: {
    fontSize: 15,
    marginBottom: 5,
    color: Colors.secondaryColorLightShade,
    fontFamily: 'PoppinsMedium',
  },
  assignedUsersPhoto: {
    flexDirection: 'row',
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 5,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDate: {
    color: Colors.secondaryColorLightShade,
    fontFamily: 'PoppinsMedium',
    marginLeft: 5,
  },
})

export default TaskCard
