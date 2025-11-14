import express, { Response } from 'express';
import { z as zod } from "zod";
import diaryService from '../services/diaryService';
import { NonSensitiveDiaryEntry } from '../types';
import { toNewDiaryEntry } from '../utils/newDiaryEntry';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
	res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
	const diary = diaryService.findById(Number(req.params.id));

	if (diary) {
		res.send(diary);
	} else {
		res.sendStatus(404);
	}
});

router.post('/', (req, res) => {
	try {
		const newDiaryEntry = toNewDiaryEntry(req.body);
		const addedEntry = diaryService.addDiary(newDiaryEntry);
		res.json(addedEntry);
	} catch (error: unknown) {
		if (error instanceof zod.ZodError) {
			res.status(400).send({ error: error.issues });
		} else {
			res.status(400).send({ error: 'unknown error' });
		}
	}
});

export default router;