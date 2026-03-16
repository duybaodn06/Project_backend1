const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        category: String,
        price: Number,
        discountPercentage: Number,
        rating: Number,
        stock: Number,
        brand: String,
        thumbnail: String
    }
)
const products = mongoose.model('product',ProductSchema,'products')
module.exports = products