import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import cors from 'cors';
import express from 'express';
const app = express();

app.use(express.json());

app.use(cors());

const PORT = 3000;

app.get('/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});