const mongoose = require('mongoose');
//定义Product 应该被何种的方式去进行存储下来

const productSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    price:{
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String, 
        lowercase: true,
        enum: ['fruit','vegetable','dairy']
    }
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;