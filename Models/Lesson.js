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
    type: {
        type: String,
        required: true,
    },
    files: [{
        fileName: {type: String},
        href: {type :String}
    }]
});

module.exports = model("Lesson", schema)