import express, { NextFunction, Request, Response } from 'express';
import { z as zod } from 'zod';
import patientsService from '../services/patientsService';
import { DiagnosesEntry, EntryEntry, NewEntryEntry, NewPatientEntry, PatientEntry } from '../types';
import { NewPatientEntrySchema } from '../utils/newPatientEntry';
import { EntrySchema } from '../utils/EntrySchema';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		NewPatientEntrySchema.parse(req.body);
		next();
	} catch (error: unknown) {
		next(error);
	}
};

const parseNewEntry = (req: Request, _res: Response, next: NextFunction) => {
	try {
		req.body = EntrySchema.parse(req.body);
		next();
	} catch (error: unknown) {
		next(error);
	}
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnosesEntry['code']> => {
	if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
		// we will just trust the data to be in correct form
		return [] as Array<DiagnosesEntry['code']>;
	}

	return object.diagnosisCodes as Array<DiagnosesEntry['code']>;
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
	if (error instanceof zod.ZodError) {
		res.status(400).send({ error: error.issues });
	} else {
		next(error);
	}
};

router.get('/', (_req, res: Response<PatientEntry[]>) => {
	res.send(patientsService.getEntries());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
	const addedEntry = patientsService.addPatient(req.body);
	res.json(addedEntry);
});

router.post('/:id/entries', parseNewEntry, parseDiagnosisCodes, (req: Request<{ id: string }, unknown, NewEntryEntry>, res: Response<EntryEntry>, next: NextFunction) => {
	const patientId = req.params.id;

	try {
		const addedEntry = patientsService.addEntry(patientId, req.body);
		res.json(addedEntry);
	} catch (error) {
		next(error);
	}
});


router.use(errorMiddleware);

export default router;