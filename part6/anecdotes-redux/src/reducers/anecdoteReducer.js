import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const anecdoteId = action.payload.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === anecdoteId)
      const newAnecdote = { ...anecdoteToChange, votes: 1 + anecdoteToChange.votes }
      const orderedAnecdotes = state.map(anecdote => (anecdote.id === anecdoteId ? newAnecdote : anecdote))
      orderedAnecdotes.sort((firstAnecdote, secondAnecdote) => secondAnecdote.votes - firstAnecdote.votes)
      return orderedAnecdotes
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      const orderedAnecdotes = (action.payload)
      orderedAnecdotes.sort((firstAnecdote, secondAnecdote) => secondAnecdote.votes - firstAnecdote.votes) 
      return orderedAnecdotes
    }
  }
})

const { voteFor, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(voteFor(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer