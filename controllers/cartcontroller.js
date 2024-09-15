const Cart = require('../models/cartmodel');

const addToCart = async(req, res) => {
    try {    
        const {user_id, product_id, quantity} = req.body;
        
        let cart = await Cart.findOne({user_id});

        if (!cart) {
            cart = new Cart({user_id});
        } else {
            const itemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
              } else {
                cart.items.push({ product_id, quantity });
              }
        }

        await cart.save();
        res.status(201).json(cart);

    } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };
    
    const removeFromCart = async (req, res) => {
      try {
        const { user_id, product_id } = req.body;
    
        const cart = await Cart.findOne({ user_id });
    
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
    
        cart.items = cart.items.filter(item => item.product_id.toString() !== product_id);
    
        await cart.save();
        res.status(200).json(cart);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };
    
    const viewCart = async (req, res) => {
      try {
        const { user_id } = req.body;
        console.log(req.body);
        
        let cart = await Cart.findOne({ user_id }).populate('items.product_id');
    
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
    
        res.status(200).json(cart);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    
    module.exports = {
      addToCart,
      removeFromCart,
      viewCart,
    };