/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose')

//establishing a connection to the database with name: phonebook
if (process.argv.length < 3) {
    console.log(
        'Please provide the password as an argument: node mongo.js <password>'
    )
    process.exit(1)
}

const password = process.argv[2]
console.log('password', password)

const url = `mongodb+srv://huenguyen:${password}@cluster0.hrjvczr.mongodb.net/phonebookApp?retryWrites=true&w=majority`

//define schema
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

//create a person model named in the singular
//models are so-called construction functions
const Person = mongoose.model('Person', personSchema, 'persons')

//add new resources
mongoose
    .connect(url)
    .then(() => {
        console.log('connected')

        //create a new object
        const name = process.argv[3]
        console.log('contactName', name)
        const number = process.argv[4]
        console.log('number', number)
        const newContact = new Person({
            name: name,
            number: number,
        })

        //save the objects to the database
        return newContact.save()
    })
    .then((result) => {
        console.log(
            `added ${result.name} number ${result.number} to phonebook`
        )
        return mongoose.connection.close()
        //if the coonecion is not closed, the program will never finish its execution
    })
    .catch((err) => console.error(err))

//connect the database and fetch all resouces
mongoose.connect(url).then(() => {
    Person.find().then((result) => {
        console.log('phonebook:')
        result.forEach((contact) => {
            console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
    })
})
