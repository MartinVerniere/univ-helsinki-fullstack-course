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

export const { notifyCreation, notifyVote, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer