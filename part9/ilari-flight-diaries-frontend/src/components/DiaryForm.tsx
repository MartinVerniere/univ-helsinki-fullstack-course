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
		setComment('');
		setWeather('');
		setVisibility('');
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
				<div>
					date:
					<input
						aria-label="date"
						type="date"
						value={date}
						onChange={(event) => setDate(event.target.value)}
					/>
				</div>
				<div>
					<b>visibility:</b>
					<div>
						<input
							aria-label="visibility"
							type="radio"
							id="visibilityChoice1"
							name="visibility"
							value='great'
							checked={visibility === "great"}
							onChange={() => setVisibility("great")}
						/>
						great
					</div>
					<div>
						<input
							aria-label="visibility"
							type="radio"
							id="visibilityChoice2"
							name="visibility"
							value='good'
							checked={visibility === "good"}
							onChange={() => setVisibility("good")}
						/>
						good
					</div>
					<div>
						<input
							aria-label="visibility"
							type="radio"
							id="visibilityChoice3"
							name="visibility"
							value='ok'
							checked={visibility === "ok"}
							onChange={() => setVisibility("ok")}
						/>
						ok
					</div>
					<div>
						<input
							aria-label="visibility"
							type="radio"
							id="visibilityChoice4"
							name="visibility"
							value='poor'
							checked={visibility === "poor"}
							onChange={() => setVisibility("poor")}
						/>
						poor
					</div>
				</div>
				<div>
					<b>weather:</b>
					<div>
						<input
							aria-label="weather"
							type="radio"
							id="weatherChoice1"
							name="weather"
							value='sunny'
							checked={weather === "sunny"}
							onChange={() => setWeather("sunny")}
						/>
						sunny
					</div>
					<div>
						<input
							aria-label="weather"
							type="radio"
							id="weatherChoice2"
							name="weather"
							value='rainy'
							checked={weather === "rainy"}
							onChange={() => setWeather("rainy")}
						/>
						rainy
					</div>
					<div>
						<input
							aria-label="weather"
							type="radio"
							id="weatherChoice3"
							name="weather"
							value='cloudy'
							checked={weather === "cloudy"}
							onChange={() => setWeather("cloudy")}
						/>
						cloudy
					</div>
					<div>
						<input
							aria-label="weather"
							type="radio"
							id="weatherChoice4"
							name="weather"
							value='stormy'
							checked={weather === "stormy"}
							onChange={() => setWeather("stormy")}
						/>
						stormy
					</div>
					<div>
						<input
							aria-label="weather"
							type="radio"
							id="weatherChoice5"
							name="weather"
							value='windy'
							checked={weather === "windy"}
							onChange={() => setWeather("windy")}
						/>
						windy
					</div>
				</div>
				<div>
					comment:
					<input
						aria-label="comment"
						type="string"
						value={comment}
						onChange={(event) => setComment(event.target.value)}
					/>
				</div>
				<button type="submit">add</button>
			</form>
		</div>
	);
}