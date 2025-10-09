import { useEffect, useState } from 'react'
import personsService from './services/persons'
import Notification from './components/Notification';
import ErrorNotification from './components/ErrorNotification';

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

const Persons = ({ personsToShow, handleDelete }) => {
	return (
		<div>
			{personsToShow.map(person =>
				<div key={person.id}>
					{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button>
				</div>
			)}
		</div>
	);
}

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [message, setMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const handleNewPerson = (event) => {
		event.preventDefault()
		console.log('button clicked', event.target);

		if (persons.some(person => person.name == newName)) {
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
				const oldPerson = persons.find(person => person.name == newName);
				const changedPerson = { ...oldPerson, number: newNumber };

				personsService.update(oldPerson.id, changedPerson)
					.then(updatedPerson => {
						setPersons(persons.map(person => person.id != oldPerson.id ? person : updatedPerson));
						setMessage(`Updated ${updatedPerson.name}'s number`);
						setTimeout(() => {
							setMessage(null);
						}, 5000);
					})
					.catch(error => {
						console.error('There was an error updating the person!', error);
						setErrorMessage('Information of the person has already been removed from server');
						setTimeout(() => {
							setErrorMessage(null);
						}, 5000);
					});

				setNewName('');
				setNewNumber('');
				return;
			}
			else {
				console.log('Update cancelled');
				return;
			}
		} else {
			const newPerson = {
				name: newName,
				number: newNumber,
			};

			personsService.create(newPerson)
				.then(newPerson => {
					console.log('newPerson', newPerson);
					setPersons(persons.concat(newPerson));
					setMessage(`Added ${newPerson.name}`);
					setTimeout(() => {
						setMessage(null);
					}, 5000);
					setNewName('');
					setNewNumber('');
				})
				.catch(error => {
					console.log(error.response.data.error);
					setErrorMessage(error.response.data.error);
				});
		}
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

	const handleDelete = (id) => {
		if (window.confirm('Are you sure you want to delete this person?')) {
			personsService.deletePerson(id)
				.then((newPersons) => {
					setPersons(persons.filter(person => person.id != id));
				})
				.catch(error => {
					console.error('There was an error deleting the person!', error);
				});
		} else {
			console.log('Deletion cancelled');
		}
	}

	useEffect(() => {
		personsService.getAll()
			.then(initialPeople => {
				console.log('promise fulfilled');
				setPersons(initialPeople);
			})
	}, []);

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
			<ErrorNotification message={errorMessage} />
			<Filter searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />

			<h3>Add a new</h3>
			<PersonForm onSubmit={handleNewPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />

			<h3>Numbers</h3>
			<Persons personsToShow={personsToShow} handleDelete={handleDelete} />
		</div>
	)
}

export default App