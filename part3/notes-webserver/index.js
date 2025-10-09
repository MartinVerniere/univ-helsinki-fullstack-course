import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import Note from './models/note.js';

const app = express();

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(express.json());
app.use(requestLogger);
app.use(express.static('dist'));

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => {
            console.log(error);
            response.status(400).send({ error: 'malformatted id' });
        }) 
});

app.post('/api/notes', (request, response) => {
    const body = request.body;

    if (!body.content) {
        return response.status(400).send({ error: 'content missing' });
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    });

    note.save().then(savedNote => {
        response.json(savedNote);
    })
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});