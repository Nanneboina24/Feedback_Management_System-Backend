const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//data declaration(structure) in collection
const userSchema = new Schema({

    username: { type: 'string', required: true },
    email: { type: 'string', unique: true },
    password: { type: 'string', required: true },
    created_at: { type: Number, default: Date.now().valueOf() }, //created_at: {type: 'datetime', required: true},
    updated_at: { type: Number, default: Date.now().valueOf() }
});

module.exports = mongoose.model('User', userSchema); // collection(User) adding in mongo db-cluster