import { z as zod } from 'zod';
import { NewPatientEntrySchema } from "./utils/newPatientEntry";

export interface DiagnosesEntry {
	code: string,
	name: string,
	latin?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export type NewPatientEntry = zod.infer<typeof NewPatientEntrySchema>;
export interface PatientEntry extends NewPatientEntry { id: string; }
export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;