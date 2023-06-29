export interface StyleType {
  [key: string]: any
}

export interface UserType {
  _id: string
  uid: string
  username: string
  email: string
  photoURL: string
  role: string
  pendingTasks?: []
  completedTasks?: []
}

export interface TaskType {
  _id: string
  title: string
  description: any
  comments: [
    {_id: string; user: {username: string; role: string}; comment: string; _createdAt: Date}
  ]
  dueDate: Date
  status: string
  createdBy: {username: string}
  assignees: []
  board: {title: string | null; _id: string}
  reviewers: {username: string}[]
}
