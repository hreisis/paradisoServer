const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    teas: [{
        type: Schema.Types.ObjectId,
        ref: 'Tea'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Favorite', favoriteSchema);