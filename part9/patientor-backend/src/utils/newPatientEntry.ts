import { z as zod } from 'zod';
import { Gender } from "../types";
import { EntrySchema } from './EntrySchema';

export const NewPatientEntrySchema = zod.object({
	name: zod.string(),
	dateOfBirth: zod.iso.date(),
	ssn: zod.string(),
	gender: zod.enum(Gender),
	occupation: zod.string(),
	entries: zod.array(EntrySchema)
});