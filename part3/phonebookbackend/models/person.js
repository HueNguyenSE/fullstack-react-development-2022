/* eslint-disable no-undef */
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
console.log(url)
mongoose
    .connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((err) => {
        console.log('error connecting to MongoDB', err.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: [true, 'User name is required'],
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function (value) {
                return /\d{2}-\d{6}/.test(value)
            },
            message: (props) => `${props.value} is not a valid number`,
        },
        required: [true, 'User phone number is required'],
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Person', personSchema, 'persons')
