const {
    Schema,
    model
} = require('mongoose');

const schema = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    files: [{
        fileName: String,
        href: String
    }]
});

module.exports = model("Lesson", schema)