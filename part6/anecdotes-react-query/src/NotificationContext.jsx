import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return `anecdote '${action.payload.content}' added`
        case 'VOTE':
            return `anecdote '${action.payload.content}' voted`
        case 'ERROR_LENGTH':
            return `error: too short anecdote, must have length 5 or more`
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