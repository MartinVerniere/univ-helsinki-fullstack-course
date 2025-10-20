import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { clearNotification, notifyVote } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return filter === 'ALL'
            ? anecdotes
            : anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })

    const handleVote = (anecdote) => {
        dispatch(voteFor(anecdote.id))
        dispatch(notifyVote(`You voted '${anecdote.content}'`))
        clearTimeout()
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return (
        <ul>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => handleVote(anecdote)}
                />
            )}
        </ul>
    )
}

export default AnecdoteList