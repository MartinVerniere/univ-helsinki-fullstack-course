import express, { Response } from 'express';

import patientsService from '../services/patientsService';
import { NonSensitivePatientsEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientsEntry[]>) => {
	res.send(patientsService.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
	res.send('Saving a diary!');
});

export default router;