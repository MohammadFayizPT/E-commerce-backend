const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true,
        },

        order_items: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        
        total_price: {
            type: Number,
            required: true
        }
    }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;