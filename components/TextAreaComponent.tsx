import React, {SetStateAction, useEffect, useState} from 'react'
import {TextInput, View, StyleSheet, Pressable, Text} from 'react-native'
import Colors from '../constants/Colors'
import {postComment} from '../lib/sanityClient'
import {useAppDispatch} from '../redux/hook'
import {addCommentToTask, refreshTasks} from '../redux/tasksSlice/tasks'

type Props = {
  id: string
  userId: string
  username: string
  role: string
}

const TextArea = ({id, userId, username, role}: Props) => {
  const dispatch = useAppDispatch()
  const [text, setText] = useState('')

  const handleChangeText = (inputText: any) => {
    setText(inputText)
  }

  const sumbitPost = () => {
    postComment(id, userId, text)
    dispatch(
      addCommentToTask({
        id,
        comment: {
          _id: id,
          user: {username, role},
          comment: text,
          _createdAt: new Date().toISOString(),
        },
      })
    )

    setText('')
  }

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Type your comment here..."
          placeholderTextColor={Colors.darkerOffWhite}
          value={text}
          onChangeText={handleChangeText}
        />
      </View>
      <Pressable
        disabled={!text}
        style={[
          styles.postButton,
          {backgroundColor: text ? Colors.pastelGreen : Colors.secondaryColor},
        ]}
        onPress={() => sumbitPost()}
      >
        <Text style={{color: Colors.navyBlue}}>Post</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkerNavyBlue,
    borderRadius: 8,
    marginVertical: 10,
    padding: 10,
    flex: 1,
  },
  textArea: {
    height: 100,
    fontSize: 16,
    textAlignVertical: 'top',
    flex: 1,
    color: Colors.offWhite,
  },
  postButton: {
    alignSelf: 'flex-end',
    marginVertical: 5,
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
})

export default TextArea
