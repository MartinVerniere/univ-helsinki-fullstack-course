import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notifyVote(state, action) {
            return action.payload
        },
        notifyCreation(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return null;
        }
    },
})

const { notifyVote, notifyCreation, clearNotification } = notificationSlice.actions

export const notifyVoted = (content, time) => {
    const timeOfNotification = time * 1000

    return async (dispatch) => {
        dispatch(notifyVote(content))
        setTimeout(() => {
            dispatch(clearNotification(content))
        }, timeOfNotification)
    }
}

export const notifyCreated = (content, time) => {
    const timeOfNotification = time * 1000

    return async (dispatch) => {
        dispatch(notifyCreation(content))
        setTimeout(() => {
            dispatch(clearNotification(content))
        }, timeOfNotification)
    }
}

export default notificationSlice.reducer