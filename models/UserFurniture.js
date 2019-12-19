const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  FurnitureSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectID,
        ref: 'users'
    },
    furniture: {
        type: Schema.Types.ObjectID,
        ref: 'furniture'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = UserFurniture = mongoose.model('user_furnitures', FurnitureSchema);