const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  FurnitureSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectID,
        ref: 'users'
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    images: [
        {
            url: {
                type: String,
                required: true
            }
        }
    ],
    reply:[
        {
            text: {
            type: String,
            required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Furniture = mongoose.model('furnitures', FurnitureSchema);