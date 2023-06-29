import React, {useState} from 'react'
import {Text, StyleSheet, View, Image} from 'react-native'
import Colors from '../../constants/Colors'
import Screen from '../../components/Screen'
import {useSearchParams} from 'expo-router'
import {useAppSelector} from '../../redux/hook'
import {TaskType} from '../../types'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {getDueDateStatus} from '../../lib/datesHelpers'
import {PortableText} from '@portabletext/react-native'
import Dropdown from '../../components/Dropdown'
import Username from '../../components/Username'
import TextAreaComponent from '../../components/TextAreaComponent'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import LGTMButton from '../../components/LGTMButton'
import {checkIfUserIsReviewer} from '../../lib/taskHelpers'

const TaskScreen = () => {
  const {
    user: {_id: userId, username, role},
  } = useAppSelector((state) => state.user)
  const userTasks = useAppSelector((state) => state.tasks.userTasks)
  const {id} = useSearchParams()

  const task = userTasks.find((task) => task._id === id)
  const {
    title,
    assignees,
    dueDate,
    status,
    board,
    description,
    _id,
    createdBy,
    comments,
    reviewers = [],
  } = task as TaskType

  const [statusSelected, setStatusSelected] = useState('')
  const [statuses, setStatuses] = useState(['active', 'blocked', 'in progress', 'in review'])

  console.log({reviewers})
  if (reviewers && reviewers.length >= 1 && !statuses.includes('completed')) {
    setStatuses([...statuses, 'completed'])
  }

  console.log(checkIfUserIsReviewer(reviewers, username))

  return (
    <Screen style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} extraHeight={150}>
        {task && (
          <>
            <View style={{marginVertical: 50}}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.createdBy}>Created by {createdBy.username}</Text>
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

            <View style={styles.taskInfoContainer}>
              <View style={styles.taskInfo}>
                {getDueDateStatus(dueDate) !== 'past due..' ? (
                  <MaterialCommunityIcons
                    style={{
                      marginRight: 10,
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
                  <Text style={styles.icon}>🪦</Text>
                )}
                <View>
                  <Text style={styles.textTitle}>Due Date</Text>
                  <Text style={styles.dueDate}>{getDueDateStatus(dueDate).replace('on ', '')}</Text>
                </View>
              </View>

              <Dropdown
                label={status || statusSelected}
                data={statuses}
                onSelect={setStatusSelected}
                id={_id}
              />
            </View>

            {/* Boards */}
            {board !== null && (
              <View style={styles.board}>
                <MaterialCommunityIcons
                  style={[styles.icon, {color: Colors.pastelBlue}]}
                  name="clipboard-edit"
                  size={24}
                />
                <View>
                  <Text style={styles.textTitle}>Board</Text>
                  <Text style={styles.boardName}>{board.title}</Text>
                </View>
              </View>
            )}

            {/* Reviewers */}
            <View style={{marginTop: 20, marginLeft: 10}}>
              <View>
                <Text
                  style={{
                    fontFamily: 'PoppinsMedium',
                    color: Colors.secondaryColorLightShade,
                    fontSize: 18,
                    marginBottom: 5,
                  }}
                >
                  Approved by:
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                {reviewers &&
                  reviewers.map((reviewer) => (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 50,
                          backgroundColor: Colors.pastelGreen,
                          marginRight: 5,
                        }}
                      />
                      <Username {...reviewer} style={{marginBottom: 0}} />
                    </View>
                  ))}
                {reviewers &&
                  reviewers.length < 2 &&
                  !checkIfUserIsReviewer(reviewers, username) && (
                    <LGTMButton userId={userId} taskId={_id} username={username} />
                  )}
              </View>
            </View>

            {/* Description */}

            <View style={styles.description}>
              <Text style={[styles.textTitle, {fontSize: 20}]}>Description</Text>

              {description ? (
                <View
                  style={{
                    borderColor: Colors.secondaryColor,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 8,
                    height: 150,
                    overflow: 'scroll',
                  }}
                >
                  <PortableText
                    value={description}
                    components={{
                      block: (props) => <Text style={styles.portableText}>{props.children}</Text>,
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    borderColor: Colors.secondaryColor,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 8,
                    height: 150,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'PoppinsMedium',
                      fontSize: 16,
                      color: Colors.secondaryColor,
                    }}
                  >
                    No description...
                  </Text>
                </View>
              )}
            </View>

            {/* Comments */}

            <View>
              <Text style={[styles.textTitle, {fontSize: 20, marginBottom: 10}]}>Comments</Text>
              <View>
                {comments.map(({user: {username, role}, comment}) => {
                  return (
                    <View>
                      <Username username={username} role={role} />
                      <View
                        style={{
                          backgroundColor: Colors.secondaryColor,
                          padding: 10,
                          borderRadius: 8,
                          marginBottom: 15,
                        }}
                      >
                        <Text style={{color: Colors.offWhite}}>{comment}</Text>
                      </View>
                    </View>
                  )
                })}
              </View>
            </View>

            {/* Add Comment */}
            <View>
              <TextAreaComponent id={_id} userId={userId} username={username} role={role} />
            </View>
          </>
        )}
      </KeyboardAwareScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navyBlue,
    padding: 20,
  },
  title: {
    fontSize: 40,
    color: Colors.offWhite,
    fontFamily: 'PoppinsMedium',
  },
  createdBy: {
    color: Colors.secondaryColor,
    fontFamily: 'PoppinsMediumItalic',
  },

  assigned: {
    fontSize: 18,
    marginBottom: 10,
    color: Colors.secondaryColorLightShade,
    fontFamily: 'PoppinsMedium',
  },
  assignedUsersPhoto: {
    flexDirection: 'row',
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 10,
  },

  taskInfoContainer: {
    marginTop: 40,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    width: '43%',
    backgroundColor: Colors.secondaryColor,
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  dropdown: {
    borderRadius: 8,
    width: '43%',
    backgroundColor: Colors.secondaryColor,
    zIndex: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  textTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 12,
    marginBottom: 5,
    color: Colors.secondaryColorLightShade,
  },
  dueDate: {
    color: Colors.offWhite,
    fontSize: 16,
    fontFamily: 'PoppinsSemiBold',
  },
  status: {
    color: Colors.offWhite,
    fontSize: 16,
    fontFamily: 'PoppinsSemiBold',
    textTransform: 'capitalize',
  },

  board: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    width: '95%',
    backgroundColor: Colors.secondaryColor,
    padding: 10,
    marginHorizontal: 10,
  },

  boardTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 12,
    marginBottom: 5,
    color: Colors.secondaryColorLightShade,
  },

  boardName: {
    color: Colors.offWhite,
    fontSize: 16,
    fontFamily: 'PoppinsSemiBold',
  },

  description: {
    marginTop: 40,
    height: 200,
  },
  portableText: {
    color: Colors.offWhite,
    lineHeight: 20,
  },
})

export default TaskScreen
