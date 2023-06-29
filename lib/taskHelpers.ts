import Colors from '../constants/Colors'

function getStatusColor(status: string): Object {
  switch (status) {
    case 'active':
      return {color: Colors.pastelBlue, borderColor: Colors.pastelBlue, textTransform: 'capitalize'}
    case 'blocked':
      return {color: Colors.pastelRed, borderColor: Colors.pastelRed, textTransform: 'capitalize'}
    case 'in progress':
      return {
        color: Colors.warningColor,
        borderColor: Colors.warningColor,
        textTransform: 'capitalize',
      }
    case 'in review':
      return {
        color: Colors.pastelPurple,
        borderColor: Colors.pastelPurple,
        textTransform: 'capitalize',
      }
    case 'completed':
      return {
        color: Colors.pastelGreen,
        borderColor: Colors.pastelGreen,
        textTransform: 'capitalize',
      }
    default:
      return {}
  }
}

const checkIfUserIsReviewer = (reviewers: any, username: string) => {
  if (!reviewers) return false
  return reviewers.some((reviewer: any) => reviewer.username === username)
}

export {getStatusColor, checkIfUserIsReviewer}
