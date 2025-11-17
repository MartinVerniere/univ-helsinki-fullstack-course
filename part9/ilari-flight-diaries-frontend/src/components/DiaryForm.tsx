import { useState } from "react";
import { type NewDiaryEntry } from "../types";

interface DiaryFormProps {
	onSubmit: (values: NewDiaryEntry) => void;
}

export const DiaryForm = (props: DiaryFormProps) => {
	const [date, setDate] = useState('');
	const [visibility, setVisibility] = useState('');
	const [weather, setWeather] = useState('');
	const [comment, setComment] = useState('');

	const resetForm = () => {
		setDate('');
		setVisibility('');
		setWeather('');
		setComment('');
	}

	const addEntry = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		const newDiaryEntry = { date, visibility, weather, comment };
		console.log("New diary entry obj:", newDiaryEntry);
		await props.onSubmit(newDiaryEntry);
		resetForm();
	}

	return (
		<div>
			<h2>Add new entry</h2>
			<form onSubmit={addEntry}>
				<div>date <input aria-label="date" type="string" value={date} onChange={(event) => setDate(event.target.value)} /></div>
				<div>visibility <input aria-label="visibility" type="string" value={visibility} onChange={(event) => setVisibility(event.target.value)} /></div>
				<div>weather <input aria-label="weather" type="string" value={weather} onChange={(event) => setWeather(event.target.value)} /></div>
				<div>comment <input aria-label="comment" type="string" value={comment} onChange={(event) => setComment(event.target.value)} /></div>
				<button type="submit">add</button>
			</form>
		</div>
	);
}