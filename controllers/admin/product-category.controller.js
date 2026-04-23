const productCategory = require('../../models/product-category.model.js')
const systemConfig = require('../../config/system.js')
const createTree = require('../../helpers/createTree.js')
// [GET] admin/product-category
module.exports.index = async (req,res) => {

    //initialize find function
    let find = {
        deleted: false,
    }
    //
    const records = await productCategory.find(find)
    const newRecords = createTree(records)

    res.render('admin/pages/productCategory/index',{
        title: "Trang danh mục sản phẩm",
        records: newRecords
    })
}

// [GET] admin/product-category/create
module.exports.create = async (req,res) => {
    //find
    let find = {
        deleted:false,
    }

    const records = await productCategory.find(find)
    const newRecords = createTree(records)

    res.render('admin/pages/productCategory/create',{
        title: "Trang danh mục sản phẩm",
        records: newRecords
    })
}

// [POST] admin/products-category/create
module.exports.createPost = async (req,res) => {
    console.log(req.body)
    if (req.body.position == ""){
        req.body.position = 1
    }else {
        req.body.position = parseInt(req.body.position)
    }
    const records = new productCategory(req.body)
    await records.save()

    res.redirect(`${systemConfig.prefixadmin}/products-category`)
}

// [GET] /admin/products-category/detail/:id
module.exports.detail = async (req,res) => {
    const id = req.params.id
    const category = await productCategory.findOne({
        _id:id,
        deleted: false
    })
    
    if (category.parent_id){
        const record = await productCategory.findOne({
            deleted: false,
            _id: category.parent_id
        })
        res.render('admin/pages/productCategory/detail',{
            title: "Trang chi tiết sản phẩm",
            category: category,
            record: record
        })
    }else{
        res.render('admin/pages/productCategory/detail',{
            title: "Trang chi tiết sản phẩm",
            category: category,
        })
    }
    

    
}

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req,res) => {
    try {
        const id = req.params.id
        const category = await productCategory.findOne({
            _id:id,
            deleted: false
        })

        //find
        let find = {
            deleted:false,
        }

        //tree records 
        const newRecords = createTree(await productCategory.find(find))
        
        
        res.render('admin/pages/productCategory/edit',{
            title: "Trang chỉnh sửa sản phẩm",
            data: category,
            records: newRecords
        })
    }catch(error){
        req.flash("error", "Không tìm thấy sản phẩm")
        res.redirect(`${systemConfig.prefixadmin}/products-category`)
    }
    
}

// [PATCH] admin/products-category/edit/:id
module.exports.editPatch = async (req,res) => {
    
    try {
        req.body.position = parseInt(req.body.position)
        await productCategory.updateOne({_id: req.params.id}, req.body)
        req.flash("success", "Cập nhật thành công")
        const backURL = req.get('Referer') || `${ADMIN_PATH}/products`
        res.redirect(backURL)
    }catch(error) {
        req.flash("error", "Cập nhật sản phẩm thất bại")
        res.redirect(`${systemConfig.prefixadmin}/products-category`)
    }
    
    
}

// [DELETE] admin/products-category/delete/:id
module.exports.delete = async (req,res) => {
    console.log(req.params.id)

    await productCategory.updateOne({ _id: req.params.id}, { 
        deleted: true,
        deletedAt: new Date()
    })
    req.flash("success", `Xóa sản phẩm thành công`)
    const backUrl = req.get('Referer')
    res.redirect(backUrl);
}
