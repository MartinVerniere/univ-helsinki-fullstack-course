import NoteForm from './components/NoteForm'
import Notes from './components/Notes'

const App = () => {
    return (
        <div>
            <ul>
                <NoteForm />
                <Notes />
            </ul>
        </div>
    )
}

export default App