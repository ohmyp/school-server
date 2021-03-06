const { Schema, model } = require('mongoose');

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    middlename: {
        type: String,
    },
    classname: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
});

module.exports = model("User", schema)