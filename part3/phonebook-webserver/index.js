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
});

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

app.get('/api/persons/:id', (request, response, next) => {
    PhonebookEntry.findById(request.params.id)
        .then(phonebookEntry => {
            if (phonebookEntry) {
                response.json(phonebookEntry);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    PhonebookEntry.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end();
        })
        .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
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
        })
        .catch(error => next(error));
});

const opts = { runValidators: true };

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body;

    PhonebookEntry.findById(request.params.id)
        .then(phonebookEntry => {
            if (!phonebookEntry) { return response.status(404).end(); }

            return phonebookEntry.update({}, { name: name, number: number }, opts)
                .then((updatedPhonebookEntry) => {
                    response.json(updatedPhonebookEntry);
                })
                .catch(error => next(error));
        })
        .catch(error => next(error));
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }

    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});