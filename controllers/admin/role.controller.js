const roles = require('../../models/roles.model')
const systemConfig = require('../../config/system.js')
const ADMIN_PATH = systemConfig.prefixadmin

// [GET] /admin/roles
module.exports.index = async (req,res) => {
    //find
    let find = {
        deleted: false
    } 
    const role = await roles.find(find)


    res.render('admin/pages/role/index.pug', {
        title: "Trang nhóm quyền",
        roles: role
    })
}

// [GET] /admin/roles/create 
module.exports.create = (req,res) => {

    res.render('admin/pages/role/create.pug', {
        title: "Tạo mới quyền",
    })
}

// [POST] /admin/roles/create 
module.exports.createPost = async (req,res) => {
    const role = new roles(req.body)
    await role.save() 

    res.redirect(`${ADMIN_PATH}/roles`)
}

// [GET] /admin/roles/edit/:id 
module.exports.edit = async (req,res) => {
    
    const data = await roles.findOne({ _id: req.params.id})
    res.render('admin/pages/role/edit.pug', {
        title: "Chỉnh sửa quyền",
        data: data
    })
}

// [PATCH] /admin/roles/edit/:id 
module.exports.editPatch = async (req,res) => {
    try{
        await roles.updateOne( { _id: req.params.id}, req.body)
        
        req.flash("success", `Cập nhật quyền thành công`)
        const backUrl = req.get('Referer')
        res.redirect(backUrl);
    }catch{
        req.flash("error", `Cập nhật quyền thất bại`)
        res.redirect(`${ADMIN_PATH}/roles`)
    }
    
}

// [DELETE] /admin/roles/delete/:id 
module.exports.delete = async (req,res) => {
    try{
        await roles.updateOne( { _id: req.params.id}, {
            deleted: true,
            deletedAt: new Date()
    })
        req.flash("success", `Đã thành công xóa quyền`)
        const backUrl = req.get('Referer')
        res.redirect(backUrl);
    }catch{
        req.flash("error", `Xóa quyền không thành công`)
        res.redirect(`${ADMIN_PATH}/roles`)
    }
    
}

// [GET] /admin/roles/permissions 
module.exports.permissions = async (req,res) => {
    //find
    let find = {
        deleted: false
    }
    const records = await roles.find(find)
    res.render('admin/pages/role/permissions.pug', {
        title: "Phân quyền",
        records:records
    })
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req,res) => {
    
    try{
        const permissions = JSON.parse(req.body.permissions)
        for (const item of permissions){
            await roles.updateOne({_id:item.id}, {permissions:item.permissions})
        }
        req.flash("success", `Cập nhật thành công`)
        const backUrl = req.get('Referer')
        res.redirect(backUrl);
    }catch{
        req.flash("error", `Cập nhật thất bại`)
        res.redirect(`${ADMIN_PATH}/roles/permissions`)
    }
}