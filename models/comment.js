const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tea: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tea'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);