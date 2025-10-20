import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, notifyCreation } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(appendAnecdote(anecdote))
        dispatch(notifyCreation(`You created '${anecdote}'`))
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