import { z as zod } from 'zod';
import { NewPatientEntrySchema } from "./utils/newPatientEntry";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export interface DiagnosesEntry {
	code: string,
	name: string,
	latin?: string
}

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<DiagnosesEntry['code']>;
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

export type NewPatientEntry = zod.infer<typeof NewPatientEntrySchema>;
export interface PatientEntry extends NewPatientEntry { id: string; }
export type NonSensitivePatientEntry = UnionOmit<PatientEntry, 'ssn' | 'entries'>;