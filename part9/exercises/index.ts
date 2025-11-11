import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { CalculatorValues, exercisesCalculator } from './exerciseCalculator';
const app = express();

app.use(express.json())

app.get('/hello', (_req, res) => { res.send('Hello Full Stack!'); });

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query;

	if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight)))
		return res.json({ error: "malformatted parameters" });

	try {
		const bmi = bmiCalculator(Number(height), Number(weight));
		return res.json({ weight, height, bmi });
	}
	catch (error) {
		return res.json({ error: error.message });
	}
});

app.post('/exercises', (req, res) => {
	const { daily_exercises, target } = req.body as CalculatorValues;
	console.log(daily_exercises, typeof daily_exercises, target, typeof target);

	const isArrayOfNumbers = daily_exercises.every(number => !isNaN(number));

	if (!daily_exercises || !target)
		return res.json({ error: "missing parameters" });

	if (!isArrayOfNumbers || isNaN(Number(target)))
		return res.json({ error: "malformatted parameters" });

	try {
		const response = exercisesCalculator(daily_exercises, Number(target));
		return res.json(response);
	}
	catch (error) {
		return res.json({ error: error.message });
	}
});


const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});