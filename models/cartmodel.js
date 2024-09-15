const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
            enum: ["user1", "user2"]
        },

        items: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            }
        ]
    }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;