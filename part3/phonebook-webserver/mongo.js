const mongoose = require('mongoose');

console.log("Number of arguments:", process.argv.length);

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
} else {
    if (process.argv.length === 3) {
        const password = process.argv[2];

        const url = `mongodb+srv://mnverniere_db_user:${password}@cluster-notes-univ-hels.goyuzel.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=cluster-notes-univ-helsinki`;

        mongoose.set('strictQuery', false);
        mongoose.connect(url);

        const phonebookEntrySchema = new mongoose.Schema({
            name: String,
            number: String,
        });

        const PhonebookEntry = mongoose.model('PhonebookEntry', phonebookEntrySchema);

        PhonebookEntry.find({}).then(result => {
            result.forEach(phonebookEntry => {
                console.log(`${phonebookEntry.name} ${phonebookEntry.number}`)
            })
            mongoose.connection.close()
        });
    } else {
        if (process.argv.length < 5) {
            console.log('name or phone number missing as argument');
            process.exit(1);
        }

        if (process.argv.length > 5) {
            console.log('more than 5 arguments passed error, if name has whitespaces it should be enclosed in quotes - "this name"');
            process.exit(1);
        }

        const password = process.argv[2];
        const phonebook_entry_name = process.argv[3];
        const phonebook_entry_number = process.argv[4];

        const url = `mongodb+srv://mnverniere_db_user:${password}@cluster-notes-univ-hels.goyuzel.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=cluster-notes-univ-helsinki`;

        mongoose.set('strictQuery', false);
        mongoose.connect(url);

        const phonebookEntrySchema = new mongoose.Schema({
            name: String,
            number: String,
        });

        const PhonebookEntry = mongoose.model('PhonebookEntry', phonebookEntrySchema);

        const phonebookEntry = new PhonebookEntry({
            name: phonebook_entry_name,
            number: phonebook_entry_number,
        });

        phonebookEntry.save().then(result => {
            console.log(`added ${phonebookEntry.name} number ${phonebookEntry.number} to phonebook`);
            mongoose.connection.close();
        });
    }
}