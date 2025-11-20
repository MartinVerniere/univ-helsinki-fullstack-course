import { z as zod } from 'zod';
import { NewPatientEntrySchema } from "./utils/newPatientEntry";
import { DiagnosesEntrySchema } from './utils/DiagnosisEntry';
import { EntrySchemaWithoutId } from './utils/EntrySchema';

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3
}

//If i dont do it like this, and do Omit<zod.infer<typeof EntrySchema>, 'id'>, it flattens type for some reason into one of three strings
export type NewEntryEntry = zod.infer<typeof EntrySchemaWithoutId>;
export type EntryEntry = NewEntryEntry & { id: string };

export type DiagnosesEntry = zod.infer<typeof DiagnosesEntrySchema>;
export type NewPatientEntry = zod.infer<typeof NewPatientEntrySchema>;
export interface PatientEntry extends NewPatientEntry { id: string; }
export type NonSensitivePatientEntry = UnionOmit<PatientEntry, 'ssn' | 'entries'>;