import { z as zod } from 'zod';
import { NewPatientEntrySchema } from "./utils/newPatientEntry";
import { DiagnosesEntrySchema } from './utils/DiagnosisEntry';

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

export type DiagnosesEntry = zod.infer<typeof DiagnosesEntrySchema>;
export type NewPatientEntry = zod.infer<typeof NewPatientEntrySchema>;
export interface PatientEntry extends NewPatientEntry { id: string; }
export type NonSensitivePatientEntry = UnionOmit<PatientEntry, 'ssn' | 'entries'>;