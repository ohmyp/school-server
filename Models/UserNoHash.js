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
    classname: {
        type: String,
        required: true,
    },
});
module.exports = model("UserNoHash", schema)