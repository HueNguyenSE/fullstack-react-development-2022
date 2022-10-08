/* eslint-disable max-len */
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.static('build')) // this middleware from express to make express show static content,the page index.html and javascript from build folder.
app.use(express.json())
app.use(cors())

morgan.token('body', function (req) {
    return JSON.stringify(req.body)
})

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

// fetch all resources in the "persons" collection
app.get('/api/persons', (request, response) => {
    Person.find({})
        .then((persons) => {
            return response.json(persons)
        })
        .catch((err) => {
            console.log(err)
            response.status(500).end
        })
})

// implement a page displaying how many entries in the phonebook and the time the request was received.
app.get('/info', (request, response) => {
    Person.find().then((persons) => {
        response.send(
            `<p>Phonebook has info for ${persons.length} people </p>
			<p>${new Date()}</p>
			`
        )
    })
})

// get a single resource from the "persons" collection with id
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then((person) => response.json(person))
})

// add a new document to the database
app.post('/api/persons', (request, response, next) => {
    const body = request.body
    console.log(body)

    // prevent posting data if the name is missing
    if (body.name === undefined) {
        return response.status(400).json({ error: 'name missing' })
    }

    // prevent posting data if the number is missing.
    if (body.number === undefined) {
        return response.status(400).json({ error: 'number missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person
        .save()
        .then((savedPerson) => response.json(savedPerson))
        .catch((error) => next(error))
})

// delete a single phonebook entry
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then((result) => {
            if (result) {
                // case 1: found the id and delete
                response.status(204).end()
            } else {
                // case 2: not found the id (result is null)
                response.status(404).send({ error: 'not found' })
            }
        })
        .catch((error) => {
            next(error)
        })
})

// edit an existing resource
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    console.log('body', body)
    console.log('request params id', request.params.id)
    console.log('request params name', request.params.name)
    console.log('request params number', request.params.number)
    console.log('request params', request.params)

    const person = {
        name: body.name,
        number: body.number,
    }
    console.log('person', person)

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then((updatedNote) => {
            response.json(updatedNote)
        })
        .catch((error) => next(error))
})

const unknownEnpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint should come to the end,just before the error handler middleware
app.use(unknownEnpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }

    next(error)
}
// handler of requests with result to errors
app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log('server running on port ' + PORT)
