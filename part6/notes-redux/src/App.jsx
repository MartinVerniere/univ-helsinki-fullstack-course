import { useDispatch } from 'react-redux'
import NoteForm from './components/NoteForm'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import { useEffect } from 'react'
import { setNotes } from './reducers/NoteReducer'
import noteService from './services/notes'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        noteService.getAll().then(notes => dispatch(setNotes(notes)))
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