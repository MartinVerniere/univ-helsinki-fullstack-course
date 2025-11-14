import diaries from '../../data/entries';

import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
	return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
	return diaries.map(({ id, date, weather, visibility }) => ({ id, date, weather, visibility }));
};

const findById = (id: number): DiaryEntry | undefined => {
	const entry = diaries.find(d => d.id === id);
	return entry;
};

const addDiary = () => {
	return null;
};

export default {
	getEntries,
	getNonSensitiveEntries,
	addDiary,
	findById
};