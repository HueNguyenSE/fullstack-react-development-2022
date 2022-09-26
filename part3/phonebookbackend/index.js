const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());

morgan.token('body', function (req) {
	return (JSON.stringify(req.body));
  })
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

//fetch all resources in the "persons" collection
app.get('/api/persons', (request, response) => {
	response.json(persons);
});

//implement a page displaying how many entries in the phonebook and the time the request was received.
app.get('/info', (request, response) => {
	response.send(
		`<p>Phonebook has info for ${persons.length} people </p>
		<p>${new Date()}</p>
		`
	);
});

//get a single resource from the "persons" collection with id
app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find((person) => person.id === id);

	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

//delete a single phonebook entry
app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((persons) => persons.id !== id);
	//console.log(persons);

	response.status(204).end();
});

//add a new phonebook entry to the collection
const generateID = () => {
	const id = Math.floor(Math.random() * 1000000);
	return id;
};

app.post('/api/persons', (request, response) => {
	const body = request.body;
//	console.log(body);

	//prevent posting data if the name is missing
	if (!body.name) {
		return response.status(400).json({ error: 'name missing' });
	}

	//prevent posting data if the number is missing.
	if (!body.number) {
		return response.status(400).json({ error: 'number missing' });
	}

	const isExist = persons.some((persons) => persons.name === body.name);
	if (isExist) {
		return response.status(400).json({ error: 'name must be unique' });
	}

	const person = {
		id: generateID(),
		name: body.name,
		number: body.number,
	};

	persons = persons.concat(person);
	response.json(persons);
});

const PORT = 3001;
app.listen(PORT);
console.log(`listening on port ${PORT}`);