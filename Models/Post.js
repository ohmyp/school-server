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
    postBody: {
        type: String,
        required: true,
    }
});

module.exports = model("Post", schema)