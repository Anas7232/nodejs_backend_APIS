const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cartItems: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            price: { type: Number, required: true },
            quantity: { type: Number }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);