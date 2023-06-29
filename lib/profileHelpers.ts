import Colors from '../constants/Colors'

function getRoleColor(role: string): Object {
  switch (role) {
    case 'Student':
      return {color: Colors.pastelBlue, borderColor: Colors.pastelBlue}
    case 'Alumni':
      return {color: Colors.pastelRed, borderColor: Colors.pastelRed}
    case 'Staff':
      return {color: Colors.warningColor, borderColor: Colors.warningColor}
    case 'Admin':
      return {color: Colors.pastelGold, borderColor: Colors.pastelGold}
    default:
      return {}
  }
}

export {getRoleColor}
