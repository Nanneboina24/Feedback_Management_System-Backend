const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//data declaration(structure) in collection
const fbackSchema = new Schema({

    username: { type: 'string', required: true },
    email: { type: 'string', unique: true },
    department: { type: 'string', required: true },
    year: { type: 'string', required: true },
    fbdata: { type: 'string', required: true },
    created_at: { type: Number, default: Date.now().valueOf() },
    updated_at: { type: Number, default: Date.now().valueOf() }
});

module.exports = mongoose.model('FBack', fbackSchema); // collection(FBack-table name) adding in mongo db-cluster