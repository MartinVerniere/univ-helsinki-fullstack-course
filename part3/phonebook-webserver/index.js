import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import PhonebookEntry from './models/person.js';

const app = express();

app.use(express.json());
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('dist'));

app.get('/', (request, response) => {
    response.send('<h1>Hello World - Phonebook!</h1>');
})

app.get('/api/persons', (request, response) => {
    PhonebookEntry.find({})
        .then(people => {
            response.json(people);
        })
});

app.get('/api/info', (request, response) => {
    PhonebookEntry.find({})
        .then(people => {
            const amountPersons = people.length;
            const currentTime = new Date();

            response.send(`
            <div>
              <h2>Phonebook has info for ${amountPersons} people</h2>
              <br>
              <h2>${currentTime}</h2>
            </div>
          `);
        });
});

app.get('/api/persons/:id', (request, response) => {
    PhonebookEntry.findById(request.params.id).then(phonebookEntry => {
        response.json(phonebookEntry);
    })
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'Name or number missing' });
    }

    const person = new PhonebookEntry({
        name: body.name,
        number: body.number,
    });

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        });
});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});