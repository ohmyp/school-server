const {Schema, model} = require('mongoose');

const schema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    headText: {
        type: String,
        required: true,
    },
    bottomText: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

module.exports = model("Post", schema)