import { useState, setState, useEffect } from 'react';
import personServices from './services/person';

function App() {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState();

	//fetch the data from the database
	useEffect(() => {
		personServices.getAll().then((iniPersons) => {
			setPersons(iniPersons);
		});
	}, []);

	//handle the search event (search by name)
	const handleSearch = (event) => {
		const input = document.getElementById('filter');
		const filter = input.value.toLowerCase();
		const numbersList = document.getElementById('numbers-list');
		const li = numbersList.getElementsByTagName('p');

		for (let i = 0; i < li.length; i++) {
			let textValue = li[i].textContent || li[i].innerText;
			if (textValue.toLowerCase().indexOf(filter) > -1) {
				li[i].style.display = '';
			} else {
				li[i].style.display = 'none';
			}
		}
	};

	//input a name
	const handleNewName = (event) => {
		event.preventDefault();
		setNewName(event.target.value);
	};

	//input a number
	const handleNewNumber = (event) => {
		event.preventDefault();
		setNewNumber(event.target.value);
	};

	//add new person with their contact number and save to server
	const addNewPerson = (event) => {
		event.preventDefault();
		for (let person of persons) {
			//check if the name is already existing
			if (person.name.toLowerCase() === newName.toLowerCase()) {
				//yes, then prompt a confirm message
				if (
					window.confirm(
						`${newName} is already added to phonebook, replace the old number with a new number?`
					) === true
				) {
					//if the user agreed to replace, then update the new number to the existing name
					personServices.update(person.id, newNumber).then((returnedPerson) => {
						setPersons(
							persons.map((p) =>
								p.id !== returnedPerson.id ? p : { ...p, number: newNumber }
							)
						);
					});
					console.log('persons after update: ', persons);
				}
			} else {
				//else, add the new person and their number to database
				const personObj = {
					name: newName,
					number: newNumber,
				};
				personServices.add(personObj).then((returnedPerson) => {
					setPersons(persons.concat(returnedPerson));
				});
			}
			//finally, reset the input boxes
			setNewName('');
			setNewNumber('');
		}
	};

	//delete a contact
	const deletePersonAt = (id) => {
		const person = persons.find((p) => p.id === id);
		//prompt a confirmation message to make sure users want to delete
		if (window.confirm(`Delete ${person.name} ?`) === true) {
			personServices
				.del(person.id)
				.then((returnedPerson) => {
					setPersons(persons.filter((p) => p.id !== returnedPerson.id));
				})
				.catch((err) => window.alert('Failed to delete: ', err.message));
			console.log('deleted', persons);
		}
	};

	return (
		<div>
			<h1>Phonebook</h1>
			<p>
				Filter shown with{' '}
				<input id='filter' type='text' onKeyUp={handleSearch} />
			</p>
			<h2>Add a new</h2>
			<form onSubmit={addNewPerson} id='form'>
				<div>
					Name:{' '}
					<input
						type='text'
						value={newName}
						onChange={handleNewName}
						required
					/>
				</div>
				<div>
					Number:{' '}
					<input
						type='tel'
						value={newNumber}
						onChange={handleNewNumber}
						required
					/>
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div id='numbers-list'>
				{persons.map((person) => (
					<p key={person.id}>
						{person.name} {person.number}
						<button onClick={() => deletePersonAt(person.id)}>delete</button>
					</p>
				))}
			</div>
		</div>
	);
}

export default App;
