import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		login(state, action) {
			blogService.setToken(action.payload.token)
			return action.payload
		},
		logout(state, action) {
			blogService.setToken(null)
			return action.payload
		},
		setUser(state, action) {
			blogService.setToken(action.payload.token)
			return action.payload
		}
	}
})

const { login, logout, setUser } = userSlice.actions

export const loginUser = (credentials) => {
	return async (dispatch) => {
		const user = await loginService.login(credentials)
		window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
		dispatch(login(user))
	}
}

export const logoutUser = () => {
	return async (dispatch) => {
		window.localStorage.removeItem('loggedNoteappUser')
		dispatch(logout(null))
	}
}

export const initializeUser = () => {
	return async (dispatch) => {
		const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
		}
	}
}

export default userSlice.reducer