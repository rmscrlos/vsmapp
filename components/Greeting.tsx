import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {getGreeting, getAbbreviatedDate, getCurrentDay} from '../lib/datesHelpers'
import Colors from '../constants/Colors'

const Greeting = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>{getGreeting()}</Text>
      <View style={styles.dateContainer}>
        <View>
          <Text style={styles.todaysDate}>Today's {getCurrentDay()}</Text>
          <Text style={styles.date}>{getAbbreviatedDate()}</Text>
        </View>
        {/* <View>
					<Text style={styles.tasksDone}>0% Done</Text>
					<Text style={styles.completedTasks}>Completed Tasks</Text>
				</View> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
  },
  greetingText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 70,
    lineHeight: 80,
    color: Colors.offWhite,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todaysDate: {
    color: Colors.offWhite,
    fontFamily: 'PoppinsMedium',
  },
  date: {
    color: Colors.secondaryColorLightShade,
  },
  tasksDone: {
    color: Colors.offWhite,
    fontFamily: 'PoppinsMedium',
    alignSelf: 'flex-end',
  },
  completedTasks: {
    color: Colors.secondaryColorLightShade,
  },
})

export default Greeting
