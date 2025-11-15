import { useEffect, useState } from 'react';
import { createNote, getAllNotes } from './services/noteService';
import type { Note } from './types';

const App = () => {
	const [newNote, setNewNote] = useState('');
	const [notes, setNotes] = useState<Note[]>([
		{ id: '1', content: 'testing' }
	]);

	const noteCreation = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		const data = await createNote({ content: newNote })
		setNotes(notes.concat(data));
		setNewNote('')
	};

	useEffect(() => {
		getAllNotes()
			.then(data => {
				setNotes(data)
			})
	}, [])

	return (
		<div>
			<form onSubmit={noteCreation}>
				<input aria-label='newNote' value={newNote} onChange={(event) => setNewNote(event.target.value)} />
				<button type='submit'> add </button>
			</form>
			<ul>
				{notes.map(note => <li key={note.id}>{note.content}</li>)}
			</ul>
		</div>
	);
}

export default App;