import * as dotenv from 'dotenv';
dotenv.config();
import { set, connect, Schema, model } from 'mongoose';

set('strictQuery', false);

const url = process.env.MONGODB_URI;

connect(url)
	.then(result => { console.log('connected to MongoDB'); })
	.catch(error => {
		console.log('error connecting to MongoDB:', error.message)
	});

const phonebookEntrySchema = new Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		minLength: 8,
		validate: {
			validator: function (v) {
				return /^\d{2,3}-\d+$/.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`
		},
		required: true,
	},
});

phonebookEntrySchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
});

export default model('PhonebookEntry', phonebookEntrySchema);