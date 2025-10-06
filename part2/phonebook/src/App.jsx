import { useState } from 'react'

const Filter = ({ searchTerm, handleSearchTerm }) => <div> filter shown with: <input value={searchTerm} onChange={handleSearchTerm} /></div>

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.newName} onChange={props.handleNewName} />
        number: <input value={props.newNumber} onChange={props.handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      )}
    </div>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleNewPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target);

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };
    console.log('newPerson', newPerson);
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const personsToShow = persons.filter(person => person.name.includes(searchTerm));

  const handleSearchTerm = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />

      <h3>Add a new</h3>
      <PersonForm onSubmit={handleNewPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App