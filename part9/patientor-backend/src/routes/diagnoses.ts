import express, { Response } from 'express';

import diagnosisService from '../services/diagnosesService';
import { DiagnosesEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<DiagnosesEntry[]>) => {
	res.send(diagnosisService.getEntries());
});

router.post('/', (_req, res) => {
	res.send('Saving a diary!');
});

export default router;