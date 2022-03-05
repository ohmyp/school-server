const {Schema, model} = require('mongoose');

const schema = new Schema({
    
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    classNumber: {
        type: String,
        required: true,
    },
    classLetter: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    results: {
        type: Object,
        required: true
    }
});

module.exports = model("TestResult", schema)