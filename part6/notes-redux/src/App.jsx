import { useDispatch } from 'react-redux'
import NoteForm from './components/NoteForm'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import { useEffect } from 'react'
import { initializeNotes } from './reducers/NoteReducer'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeNotes())
    }, [dispatch])

    return (
        <div>
            <ul>
                <NoteForm />
                <VisibilityFilter />
                <Notes />
            </ul>
        </div>
    )
}

export default App