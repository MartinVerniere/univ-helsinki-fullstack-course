import * as dotenv from 'dotenv';
dotenv.config();
import { set, connect, Schema, model, connection } from 'mongoose'

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const url = process.env.MONGODB_URI;

set('strictQuery', false);

connect(url);

const noteSchema = new Schema({
    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean,
})

const Note = model('Note', noteSchema)

/* const note = new Note({
    content: 'HTML is easy',
    important: true,
})

note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
}) */

Note.find({}).then(result => { // or Note.find({ important: true }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    connection.close()
})