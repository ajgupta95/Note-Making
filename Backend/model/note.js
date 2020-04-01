const mongoose = require('mongoose');
const schema = mongoose.Schema;


const notes = new schema({
    title: {
        type: String,
        required: true,
        trim: true,

    },
    content: { type: String, required: true, trim: true },
    selectedOption: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    likes: { type: Number, required: true, trim: true },
    comments: { type: Array, required: true, trim: true },




    tags: { type: String, required: true, trim: true },
           }, {
    timestamps: true,
           }

);

const Notes = mongoose.model('Notes', notes);

module.exports = Notes