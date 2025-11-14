import { z as zod } from 'zod';
import { Visibility, Weather } from '../types';

export const NewDiaryEntrySchema = zod.object({
	weather: zod.enum(Weather),
	visibility: zod.enum(Visibility),
	date: zod.iso.date(),
	comment: zod.string().optional()
});