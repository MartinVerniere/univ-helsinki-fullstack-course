import { set, connect, Schema, model } from 'mongoose';

set('strictQuery', false);

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const password = process.argv[2];

//const url = process.env.MONGODB_URI;
const url = `mongodb+srv://mnverniere_db_user:${password}@cluster-notes-univ-hels.goyuzel.mongodb.net/notesApp?retryWrites=true&w=majority&appName=cluster-notes-univ-helsinki`;


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