import { useEffect, useState } from 'react';
import diaryService from './services/diaries'
import { DiaryEntries } from './components/DiaryEntries';
import type { DiaryEntry } from './types';

function App() {
	const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

	const fetchData = () => diaryService.getAll();

	useEffect(() => {
		fetchData()
			.then(data => setDiaryEntries(data));
	}, []);

	return (
		<div>
			<DiaryEntries diaryEntries={diaryEntries} />
		</div>
	);
}

export default App
