import express from 'express';
import morgan from 'morgan';

const app = express();

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (request, response) => {
    response.send('<h1>Hello World - Phonebook!</h1>');
})

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/info', (request, response) => {
    const amountPersons = persons.length;
    console.log(amountPersons);
    const currentTime = new Date();
    console.log(currentTime);

    response.send(`
        <div>
          <h2>Phonebook has info for ${amountPersons} people</h2>
          <br>
          <h2>${currentTime}</h2>
        </div>
      `);
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(person => person.id === id);

    if (person) {
        response.json(person);
    }
    else {
        response.status(404).end();
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.floor(Math.random() * 10000)
        : 0;
    console.log(maxId);
    return String(maxId + 1);
}

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number missing'
        });
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'Name must be unique'
        });
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person);

    response.json(person);
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})