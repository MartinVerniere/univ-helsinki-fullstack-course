import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, notifyCreation } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newNote = await anecdoteService.createNew(anecdote)
        dispatch(createAnecdote(newNote))
        dispatch(notifyCreation(`You created '${newNote.content}'`))
        setTimeout(() => {
            dispatch(clearNotification(null))
        }, 5000)
    }

    return (
        <form onSubmit={addAnecdote}>
            <h2>create new</h2>
            <div>
                <input name="anecdote" />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default AnecdoteForm