import type { DiaryEntry } from "../types";

interface DiaryEntriesProps {
	diaryEntries: DiaryEntry[];
}

const DiaryEntry = (props: DiaryEntry) => {
	return (
		<div>
			<h3> {props.date} </h3>
			<p> visibility: {props.visibility} </p>
			<p> weather: {props.weather} </p>
			{props.comment && <p> comment: {props.comment} </p>}
		</div>
	);
};


export const DiaryEntries = (props: DiaryEntriesProps) => {
	return (
		<div>
			<h2> Diary Entries: </h2>
			{props.diaryEntries.map(diaryEntry => <DiaryEntry key={diaryEntry.id} {...diaryEntry} />)}
		</div>
	);
};
