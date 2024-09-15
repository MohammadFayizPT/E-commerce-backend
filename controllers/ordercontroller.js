const Order = require('../models/ordermodel'); 
const Cart = require('../models/cartmodel'); 

const placeOrder = async (req, res) => {
  try {
    const { user_id } = req.body;

    const cart = await Cart.findOne({ user_id }).populate('items.product_id');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty or not found' });
    }

    let totalPrice = 0;
    cart.items.forEach(item => {
      totalPrice += item.product_id.price * item.quantity;
    });

    const order = new Order({
      user_id: user_id,
      order_items: cart.items.map(item => ({
        product_id: item.product_id._id,
        quantity: item.quantity
      })),
      total_price: totalPrice
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order Placed",
      order
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  placeOrder
};
