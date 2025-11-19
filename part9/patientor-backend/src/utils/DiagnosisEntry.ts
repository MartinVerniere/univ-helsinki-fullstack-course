import { z as zod } from 'zod';

export const DiagnosesEntrySchema = zod.object({
	code: zod.string(),
	name: zod.string(),
	latin: zod.string().optional(),
});