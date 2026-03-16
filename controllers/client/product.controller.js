const products = require('../../models/product.model')

module.exports.index = async (req,res) => {
    const Products = await products.find({});
    const NewProducts = Products.map(item => {
        item.newprice = ((item.discountPercentage/100 + 1) * item.price).toFixed(2)
        return item
    })
    console.log(Products)
    res.render('client/pages/products/index.pug', {
        title: "Trang danh sách sản phẩm",
        products: NewProducts
    })
}