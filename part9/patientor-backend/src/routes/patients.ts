import express, { NextFunction, Request, Response } from 'express';
import { z as zod } from 'zod';
import patientsService from '../services/patientsService';
import { NewPatientEntry, PatientEntry } from '../types';
import { NewPatientEntrySchema } from '../utils/newPatientEntry';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		NewPatientEntrySchema.parse(req.body);
		next();
	} catch (error: unknown) {
		next(error);
	}
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

router.use(errorMiddleware);

export default router;