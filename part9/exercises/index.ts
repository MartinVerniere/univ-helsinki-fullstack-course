import express from 'express';
import { bmiCalculator } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => { res.send('Hello Full Stack!'); });

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query;

	if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight)))
		res.json({ error: "malformatted parameters" });

	try {
		const bmi = bmiCalculator(Number(height), Number(weight));
		res.json({ weight, height, bmi });
	}
	catch (error) {
		res.json({ error });
	}
});


const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});