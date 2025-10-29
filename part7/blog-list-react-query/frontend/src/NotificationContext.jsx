import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'ADD':
			return `a new blog '${action.payload.title}' by ${action.payload.author} added`
		case 'LIKE':
			return `blog '${action.payload.title}' by ${action.payload.author} has been liked`
		case 'DELETE':
			return `blog '${action.payload.title}' by ${action.payload.author} has been deleted`
		case 'LOGIN':
			return `welcome back ${action.payload.name}`
		case 'ERROR_ADD':
			return `Blog '${action.payload.title}' couldnt be added to the list`
		case 'ERROR_LIKE':
			return `Blog '${action.payload.title}' couldnt be liked`
		case 'ERROR_DELETE':
			return `Blog '${action.payload.title}' couldnt be deleted`
		case 'ERROR_LOGIN':
			return action.payload.content
		case 'CLEAR':
			return null
	}
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
	const [notification, notificationDispatch] = useReducer(notificationReducer, null)

	return (
		<NotificationContext.Provider value={{ notification, notificationDispatch }}>
			{props.children}
		</NotificationContext.Provider>
	)
}

export default NotificationContext