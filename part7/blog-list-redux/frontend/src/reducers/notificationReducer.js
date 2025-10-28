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
		notifyDelete(state, action) {
			return action.payload
		},
		notifyError(state, action) {
			return action.payload
		},
		clearNotification(state, action) {
			return null
		},
	},
})

const { notifyVote, notifyCreation, notifyDelete, notifyError, clearNotification } =
	notificationSlice.actions

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

export const notifyAnError = (content, time) => {
	const timeOfNotification = time * 1000

	return async (dispatch) => {
		dispatch(notifyError(content))
		setTimeout(() => {
			dispatch(clearNotification(content))
		}, timeOfNotification)
	}
}

export const notifyDeleted = (content, time) => {
	const timeOfNotification = time * 1000

	return async (dispatch) => {
		dispatch(notifyDelete(content))
		setTimeout(() => {
			dispatch(clearNotification(content))
		}, timeOfNotification)
	}
}

export default notificationSlice.reducer
