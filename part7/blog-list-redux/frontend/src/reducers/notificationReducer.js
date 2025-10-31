import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		notify(state, action) {
			return action.payload
		},
		notifyError(state, action) {
			return action.payload
		},
		clearNotification() {
			return null
		},
	},
})

const { notify, notifyError, clearNotification } =
	notificationSlice.actions

export const notifyAction = (content, time) => {
	const timeOfNotification = time * 1000

	return async (dispatch) => {
		dispatch(notify(content))
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

export default notificationSlice.reducer
