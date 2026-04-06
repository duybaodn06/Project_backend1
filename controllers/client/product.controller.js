const products = require('../../models/product.model')

// [GET] /products
module.exports.index = async (req,res) => {
    const Products = await products.find({
        deleted: false,
        status: 'active'
    }).sort({position:"asc"});
    const NewProducts = Products.map(item => {
        item.newprice = ((item.discountPercentage/100 + 1) * item.price).toFixed(2)
        return item
    })

    res.render('client/pages/products/index.pug', {
        title: "Trang danh sách sản phẩm",
        products: NewProducts
    })
}

// [GET] detail/:slug 
module.exports.detail = async (req,res) => {
    const find = {
        deleted: false,
        status: 'active',
        slug: req.params.slug
    }
    const product = await products.findOne(find)
    console.log(product)
    res.render(`client/pages/products/detail.pug`, {
        title: "Chi tiết sản phẩm",
        product: product
    })
}