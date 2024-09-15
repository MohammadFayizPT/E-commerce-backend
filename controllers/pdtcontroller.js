const Product = require('../models/pdtmodel');

const createProduct = async(req, res) => {
    try {
        const product = new Product(req.body);
        console.log(req.body);
        await product.save();
        res.status(201).json({
            message: "Product created successfully",
            product: product
    });
    } catch(e) {
        res.status(400).json({error: e.message});
    }
};

const getProducts = async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch(e) {
        res.status(500).json({error: e.message});
    }
};

module.exports = {
    createProduct,
    getProducts,
};