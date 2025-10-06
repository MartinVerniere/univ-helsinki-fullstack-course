import { useState } from 'react'

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
      <div> filter shown with: <input value={searchTerm} onChange={handleSearchTerm} /></div>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person =>
          <div key={person.id}>
            {person.name} {person.number}
          </div>
        )}
      </div>
    </div>
  )
}

export default App