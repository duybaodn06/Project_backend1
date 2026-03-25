const products = require('../../models/product.model')
const filterStatusHelper = require('../../helpers/filterStatus.js')
const searchHelper = require('../../helpers/search.js')
const pagination  = require('../../helpers/pagination.js')
// [GET] /admin/products
module.exports.index = async (req,res) => {
    //import filter
    const filerStatus = filterStatusHelper(req.query)

    //initialize find function
    let find = {
        deleted: false
    }


    if (req.query.status) {
        find.status = req.query.status
    }

    //import search
    const objectSearch = searchHelper(req.query)
    if (objectSearch.regexp) find.title = objectSearch.regexp

    //import pagination
    const countProducts = await products.countDocuments(find)
    const objectPagination = pagination(req.query,products,countProducts)
    

    //create Products
    const Products = await products.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip)
    

    // console.log(Products)
    res.render('admin/pages/product/index.pug',{
        title: "Danh sách sản phẩm",
        products: Products,
        filterStatus: filerStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}