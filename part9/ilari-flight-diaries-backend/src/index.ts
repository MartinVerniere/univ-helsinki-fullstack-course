import diaryRouter from './routes/diaries';
import express from 'express';
const app = express();
import cors from 'cors';

app.use(express.json());

const PORT = 3000;

app.use(cors());

app.get('/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});