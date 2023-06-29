function getGreeting(): string {
  const currentTime = new Date()
  const currentHour = currentTime.getHours()

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good morning'
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'Good afternoon'
  } else if (currentHour >= 18 && currentHour < 24) {
    return 'Good evening'
  } else {
    return 'Time to sleep..😴'
  }
}

function getAbbreviatedDate(): string {
  const currentDate = new Date()
  const month = currentDate.toLocaleString('default', {month: 'short'})
  const day = currentDate.getDate()
  const year = currentDate.getFullYear()

  return `${month} ${day}, ${year}`
}

function getCurrentDay(): string {
  const currentDate = new Date()
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currentDayIndex = currentDate.getDay()

  return daysOfWeek[currentDayIndex]
}

function getDueDateStatus(dueDate: Date): string {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const date = new Date(dueDate)

  if (date < today) {
    return 'past due..'
  }

  if (date.toDateString() === today.toDateString()) {
    return 'Due Today'
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Due Tomorrow'
  } else {
    const month = date.toLocaleString('default', {month: 'short'})
    const day = date.getDate()
    return `Due on ${month} ${day}`
  }
}

export {getGreeting, getAbbreviatedDate, getCurrentDay, getDueDateStatus}
