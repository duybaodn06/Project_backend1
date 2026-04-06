const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)
const ProductSchema = new mongoose.Schema(
    {
        // _id:String,
        title: String,
        description: String,
        category: String,
        price: Number,
        discountPercentage: Number,
        rating: Number,
        stock: Number,
        brand: String,
        thumbnail: String,
        status: String,
        slug: {
            type: String,
            slug: "title",
            unique:true
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,
        position: Number
    },
    {timestamps: true}
)
const products = mongoose.model('product',ProductSchema,'products')
module.exports = products