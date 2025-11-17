import { useEffect, useState } from 'react';
import diaryService from './services/diaries'
import { DiaryEntries } from './components/DiaryEntries';
import type { DiaryEntry, NewDiaryEntry } from './types';
import { DiaryForm } from './components/DiaryForm';

function App() {
	const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

	const fetchData = () => diaryService.getAll();

	const onSubmit = async (newDiaryEntry: NewDiaryEntry) => {
		const data = await diaryService.create(newDiaryEntry);
		setDiaryEntries(diaryEntries.concat(data));
	}

	useEffect(() => {
		fetchData()
			.then(data => setDiaryEntries(data));
	}, []);

	return (
		<div>
			<DiaryForm onSubmit={onSubmit} />
			<DiaryEntries diaryEntries={diaryEntries} />
		</div>
	);
}

export default App
