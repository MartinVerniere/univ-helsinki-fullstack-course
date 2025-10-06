import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const handleNewPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target);

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName
    };
    setPersons(persons.concat(newPerson));
    setNewName('');
  }

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <div key={person.name}>
            {person.name}
          </div>
        )}
      </div>
    </div>
  )
}

export default App