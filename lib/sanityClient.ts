import sanityClient from '@sanity/client'

// @ts-ignore: Unreachable code error
import {SANITY_PROJECT_ID, SANITY_DATASET, TOKEN} from '@env'
import groq from 'groq'

export const client = sanityClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-03',
  token: TOKEN,
})

/* USERS */
export const getUser = (uid: string) => {
  const userQuery = groq`
		*[_type == "users" && uid == "${uid}"][0]{
			_id,
			username,
			uid,
			role,
      email,
      photoURL
		}
		`
  return client.fetch(userQuery)
}

export const createUser = (
  username: string | null,
  uid: string,
  email: string | null,
  photoURL: string | null
) => {
  const user = {
    _type: 'users',
    username,
    uid,
    email,
    photoURL,
    role: 'Student',
  }

  return client.create(user)
}

/* TASKS */
export const getTasks = async () => {
  const taskQuery = groq`
		*[_type == "tasks"]{
			_id,
			title,
			description,
			status,
			dueDate,
			assignee
		}
		`
  const res = await client.fetch(taskQuery)
  return res
}

export const getMyAssignedTasks = async (uid: string) => {
  const {_id} = await getUser(uid)

  const taskQuery = groq`
    *[_type == "tasks" && references("${_id}") ]{
      _id,
      title,
      description,
      status,
      dueDate,
      createdBy->{username},
      assignees[]-> {
          photoURL
        },
      board->{_id, title},
      'reviewers': coalesce(reviewers[] -> { username }, []),
      'comments': *[_type == "comments" && references(^._id) && approved == true] | order(_createdAt desc) {
        _id,
        comment,
        _createdAt,
        user->{
        username,
        role
      }
      }
    }
    `
  const res = await client.fetch(taskQuery, {_id})
  return res
}

export const postComment = async (taskId: string, userId: string, comment: string) => {
  const task = await client.fetch(`*[_type == "tasks" && _id == $taskId][0]`, {taskId})

  if (task) {
    const newComment = {
      _type: 'comments',
      user: {
        _type: 'reference',
        _ref: userId,
      },
      comment,
      approved: true,
      task: {
        _type: 'reference',
        _ref: task._id,
      },
    }

    const result = await client.create(newComment)
    return result
  }
}

export const patchTaskStatus = async (id: string, status: string | undefined) => {
  const task = await client.fetch(`*[_type == "tasks" && _id == $id][0]`, {id})

  if (task) {
    await client.patch(task._id).set({status}).commit()
  }
}

export const addApprovalsToTask = async (userId: string, taskId: string) => {
  try {
    const task: any = await client.getDocument(taskId)
    // Check if the reviewers field exists and is an array
    const updatedReviewers = Array.isArray(task?.reviewers)
      ? [...task.reviewers, {_type: 'reference', _ref: userId}]
      : [{_type: 'reference', _ref: userId}]

    await client.patch(taskId).set({reviewers: updatedReviewers}).commit()
  } catch (error) {
    console.error('Error adding reviewer:', error)
  }
}

/* BOARDS */
export const getBoards = () => {
  const taskQuery = groq`
		*[_type == "boards"]{
			_id,
			title,
			description,
			status,
			dueDate,
			assignee
		}
		`
  client.fetch(taskQuery)
}

export const getMyAssignedBoards = async (uid: string) => {
  const {_id} = await getUser(uid)

  const taskQuery = groq`
    *[_type == "boards" && assignee._ref == "${_id}" ]{
      _id,
      title,
      description,
      status,
      dueDate,
      assignee
    }
    `
  const res = await client.fetch(taskQuery)
  return res
}
