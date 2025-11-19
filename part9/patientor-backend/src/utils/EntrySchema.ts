import { z as zod } from 'zod';
import { HealthCheckRating } from '../types';

const BaseEntrySchema = zod.object({
	id: zod.string(),
	description: zod.string(),
	date: zod.string(), // or zod.iso.date() if you prefer
	specialist: zod.string(),
	diagnosisCodes: zod.array(zod.string()).optional(),
});

const DischargeSchema = zod.object({
	date: zod.string(),
	criteria: zod.string(),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
	type: zod.literal("Hospital"),
	discharge: DischargeSchema,
});

const SickLeaveSchema = zod.object({
	startDate: zod.string(),
	endDate: zod.string(),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
	type: zod.literal("OccupationalHealthcare"),
	employerName: zod.string(),
	sickLeave: SickLeaveSchema.optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
	type: zod.literal("HealthCheck"),
	healthCheckRating: zod.enum(HealthCheckRating),
});

export const EntrySchema = zod.discriminatedUnion("type", [
	HospitalEntrySchema,
	OccupationalHealthcareEntrySchema,
	HealthCheckEntrySchema,
]);