const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)
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
        thumbnail: String,
        status: String,
        slug: {
            type: String,
            slug: "title",
            unique:true
        },
        createdBy: {
            account_id: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deletedBy: {
            account_id: String,
            deletedAt: Date
        },
        position: Number
    },
    {timestamps: true}
)
const products = mongoose.model('product',ProductSchema,'products')
module.exports = products