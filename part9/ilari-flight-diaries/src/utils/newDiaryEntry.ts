import { z as zod } from 'zod';
import { NewDiaryEntry, Visibility, Weather } from '../types';

export const NewDiaryEntrySchema = zod.object({
	weather: zod.enum(Weather),
	visibility: zod.enum(Visibility),
	date: zod.iso.date(),
	comment: zod.string().optional()
});

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => NewDiaryEntrySchema.parse(object);