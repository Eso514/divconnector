const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  FurnituresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    image:{
        url: {
            type: String,
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Furnitures = mongoose.model('furniture', FurnituresSchema);