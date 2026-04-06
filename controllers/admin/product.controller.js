const products = require('../../models/product.model')
const filterStatusHelper = require('../../helpers/filterStatus.js')
const searchHelper = require('../../helpers/search.js')
const pagination  = require('../../helpers/pagination.js')
const systemConfig = require('../../config/system.js')
const PATH_ADMIN = systemConfig.prefixadmin
// [GET] /admin/products
module.exports.index = async (req,res) => {
    //import filter
    const filerStatus = filterStatusHelper(req.query)

    //initialize find function
    let find = {
        deleted: false,
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
    const Products = await products.find(find).sort({position: "asc"}).limit(objectPagination.limitItems).skip(objectPagination.skip)
    

    // console.log(Products)
    res.render('admin/pages/product/index.pug',{
        title: "Danh sách sản phẩm",
        products: Products,
        filterStatus: filerStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req,res) => {

    const status = req.params.status
    const id = req.params.id
    await products.updateOne({ _id: id }, { status: status })

    req.flash("success", "Cập nhật thành công")
    const backUrl = req.get('Referer') || `/${PATH_ADMIN}/products`; 

    
    res.redirect(backUrl);
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req,res) => {
    const type = req.body.type
    const ids = req.body.ids.split(', ')

    console.log(req.body)
    switch (type){
        case 'active': 
            await products.updateMany({ _id: { $in: ids}}, {status: "active"})
            req.flash("success", `Cập nhật thành công ${ids.length} sản phẩm`)
            break;
        case 'inactive':
            await products.updateMany({ _id: { $in: ids}}, {status: "inactive"})
            req.flash("success", `Cập nhật thành công ${ids.length} sản phẩm`)
            break;
        case 'delete':
            await products.updateMany({ _id: { $in: ids}},{deleted: true,deletedAt: new Date()})
            req.flash("success", `Xóa thành công ${ids.length} sản phẩm`)
            break;
        case 'change-position':

            for(const item of ids){
                let [id,pos] = item.split("-")
                pos = parseInt(pos)
                await products.updateOne({_id: id}, {position: pos})
            }
            req.flash("success", `Đổi vị trí thành công ${ids.length} sản phẩm`)
            break;
        default: break;
    }
    
    
    const backUrl = req.get('Referer') || `/${PATH_ADMIN}/products`; 
    res.redirect(backUrl);
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req,res) => {
    const id = req.params.id
    console.log(id)

    await products.updateOne({ _id: id }, { 
        deleted: true,
        deletedAt: new Date()
    })
    req.flash("success", `Xóa sản phẩm thành công`)
    const backUrl = req.get('Referer') || `/${PATH_ADMIN}/products`; 
    res.redirect(backUrl);
}

// [GET] /admin/products/create
module.exports.create = (req,res) => {
 
    res.render('admin/pages/product/create.pug', {
        title: "Trang tạo mới sản phẩm"
    })
}

// [POST] /admin/products/create
module.exports.createPost = async (req,res) => {

    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position =parseInt(req.body.position)
    console.log(req.file)

    if (req.file) req.body.thumbnail = `/uploads/${req.file.filename}`
    
    
    const product = new products(req.body)
    await product.save()
    res.redirect(`${PATH_ADMIN}/products`)
}

// [GET] /admin/products/create/:id
module.exports.edit = async (req,res) => {
    try{
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await products.findOne(find)


        res.render('admin/pages/product/edit.pug', {
            title: "Trang chỉnh sửa sản phẩm",
            product: product
        })
    }catch(error){  
        req.flash('error', 'Không tìm thấy sản phẩm')
        res.redirect(`${PATH_ADMIN}/products`)
        
    }  
}

// [PATCH] /admin/products/create/:id
module.exports.editPatch = async (req,res) => {

    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position =parseInt(req.body.position)

    if (req.file) req.body.thumbnail = `/uploads/${req.file.filename}`
    
    try {
        await products.updateOne({ _id: req.params.id} , req.body)
        req.flash('success', 'Cập nhật thành công')
    }catch(error) {
        req.flash('error', 'Cập nhật thất bại')
    }
    
    // res.redirect(`${PATH_ADMIN}/products`)
    const backUrl = req.get('Referer') 
    res.redirect(backUrl);
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req,res) => {
    try{
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await products.findOne(find)


        res.render('admin/pages/product/detail.pug', {
            title: "Trang chi tiết sản phẩm",
            product: product
        })
    }catch(error){  
        req.flash('error', 'Không tìm thấy sản phẩm')
        res.redirect(`${PATH_ADMIN}/products`)
        
    }  
}


