import express, { Response } from 'express';

import patientsService from '../services/patientsService';
import { NonSensitivePatientEntry } from '../types';
import toNewPatientEntry from '../utils/newPatientEntry';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
	res.send(patientsService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
	const newPatientEntry = toNewPatientEntry(req.body);

	const addedEntry = patientsService.addPatient(newPatientEntry);
	res.json(addedEntry);
});

export default router;