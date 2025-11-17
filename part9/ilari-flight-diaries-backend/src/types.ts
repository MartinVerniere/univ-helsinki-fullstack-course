import { z as zod } from 'zod';
import { NewDiaryEntrySchema } from './utils/newDiaryEntry';

export enum Weather {
	Sunny = 'sunny',
	Rainy = 'rainy',
	Cloudy = 'cloudy',
	Stormy = 'stormy',
	Windy = 'windy',
}

export enum Visibility {
	Great = 'great',
	Good = 'good',
	Ok = 'ok',
	Poor = 'poor',
}

export type NewDiaryEntry = zod.infer<typeof NewDiaryEntrySchema>;
export interface DiaryEntry extends NewDiaryEntry { id: number; }
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;