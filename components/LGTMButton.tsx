import React from 'react'
import {Text} from 'react-native'
import Button from './Button'
import Colors from '../constants/Colors'

import {useAppDispatch} from '../redux/hook'
import {addApprovalsToTask} from '../lib/sanityClient'
import {addReviewer} from '../redux/tasksSlice/tasks'

type Props = {
  userId: string
  taskId: string
  username: string
}

const LGTMButton = ({userId, taskId, username}: Props) => {
  const dispatch = useAppDispatch()
  const handleApproval = () => {
    addApprovalsToTask(userId, taskId)
    dispatch(addReviewer({taskId, username}))
  }
  return (
    <Button
      onPress={handleApproval}
      style={{
        backgroundColor: Colors.pastelGreen,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{fontFamily: 'PoppinsSemiBold', fontSize: 10}}>LGTM</Text>
    </Button>
  )
}

export default LGTMButton
