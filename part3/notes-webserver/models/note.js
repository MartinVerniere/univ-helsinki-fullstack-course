import * as dotenv from 'dotenv';
dotenv.config();
import { set, connect, Schema, model } from 'mongoose';

set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);
connect(url)
    .then(result => { console.log('connected to MongoDB'); })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    });

const noteSchema = new Schema({
    content: String,
    important: Boolean,
});

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

export default model('Note', noteSchema)