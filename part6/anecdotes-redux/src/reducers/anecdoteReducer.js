import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const anecdoteId = action.payload
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
      return action.payload
    }
  }
})

export const { voteFor, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer