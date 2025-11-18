import { useEffect, useState } from 'react';
import diaryService from './services/diaries'
import { DiaryEntries } from './components/DiaryEntries';
import type { DiaryEntry, NewDiaryEntry } from './types';
import { DiaryForm } from './components/DiaryForm';
import { Notification } from './components/Notification';
import axios from 'axios';

interface ValidationErrorItem {
	code: string;
	message: string;
	path: string[];
}

interface ValidationErrorResponse {
	error: ValidationErrorItem[];
}

function App() {
	const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
	const [notification, setNotification] = useState<string | null>(null);
	const [error, setError] = useState(false);

	const fetchData = () => diaryService.getAll();

	const showNotification = (message: string, isError = false) => {
		setError(isError);
		setNotification(message);

		setTimeout(() => {
			setNotification(null);
		}, 5000);
	};

	const onSubmit = async (newDiaryEntry: NewDiaryEntry) => {
		try {
			const data = await diaryService.create(newDiaryEntry);
			setDiaryEntries(diaryEntries.concat(data));
			showNotification("Diary entry added!");
		} catch (error) {
			if (axios.isAxiosError<ValidationErrorResponse>(error)) {
				const response = error.response;

				console.log(response);
				if (response) {
					const errors = response.data.error;
					const fullMessage = errors
						.map(error => `• ${error.path[0]}: ${error.message}`)
						.join('\n');

					showNotification(fullMessage, true);
				} else {
					console.log("Error accessing axios response");
				}
			} else {
				console.error("Not axios error:", error);
			}
		}
	}

	useEffect(() => {
		fetchData()
			.then(data => setDiaryEntries(data));
	}, []);

	return (
		<div>
			{notification && <Notification notification={notification} error={error} />}
			<DiaryForm onSubmit={onSubmit} />
			<DiaryEntries diaryEntries={diaryEntries} />
		</div>
	);
}

export default App
