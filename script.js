const express = require('express');
const mongoose = require('mongoose');
const cartRoutes = require('./routes/cartroutes');
const productRoutes = require('./routes/pdtroutes');
const orderRoutes = require('./routes/orderroutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


const db = "YOUR MONGODB_ATLAS_CONNECTION_STRING";
mongoose.connect(db).then(() => {
    console.log("connected to db");
}).catch((e) => {
    console.log(e);   
});

app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);

app.listen(PORT,() => console.log(`Server is running on ${PORT}`));