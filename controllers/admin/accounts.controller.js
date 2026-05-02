const accounts = require('../../models/accounts.model')
const roles = require('../../models/roles.model.js')
const systemConfig = require('../../config/system.js')
const md5 = require('md5');
const ADMIN_PATH = systemConfig.prefixadmin

// [GET] /admin/accounts
module.exports.index = async (req,res) => {
    //find
    let find = {
        deleted: false
    } 
    const Accounts = await accounts.find(find)
    for (const record of Accounts){
        const role = await roles.findOne({
            _id: record.role_id,
            deleted: false
        })
        record.role = role
    }

    
    res.render('admin/pages/account/index.pug', {
        title: "Trang danh sách tài khoản",
        accounts: Accounts
    })
}

// [GET] /admin/accounts/create
module.exports.create = async (req,res) => {
    //find
    let find = {
        deleted: false
    } 
    const Roles = await roles.find(find)

    res.render('admin/pages/account/create.pug', {
        title: "Trang tạo tài khoản",
        roles: Roles

    })
}

// [POST] /admin/accounts/create
module.exports.createPost = async (req,res) => {
    const emailExist = await accounts.findOne({
        email: req.body.email,
        deleted: false
    })
    if (emailExist){
        req.flash('error', `Email ${emailExist.email} đã tồn tại`)
        const backURL = req.get('Referer')
        res.redirect(backURL)
    }
    else{
        req.body.password = md5(req.body.password)
        const records = new accounts(req.body)
        await records.save()
        res.redirect(`${ADMIN_PATH}/accounts`)
    } 
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req,res) => {
    //find
    let find = {
        deleted: false
    } 
    const Roles = await roles.find(find)
    const account = await accounts.findOne( {_id: req.params.id, deleted: false} )
    const role = await roles.findOne({_id: account.role_id})
    res.render('admin/pages/account/edit.pug', {
        title: "Trang chỉnh sửa tài khoản",
        roles: Roles,
        account: account,
        currentRole: role
    })
}


// [PATCH] admin/accounts/edit/:id
module.exports.editPatch = async (req,res) => {
    const emailExist = await accounts.findOne({
        _id: { $ne: req.params.id},
        email: req.body.email,
        deleted: false
    })
    if (emailExist){
        req.flash('error', `Email ${emailExist.email} đã tồn tại`)
        const backURL = req.get('Referer')
        res.redirect(backURL)
        return;
    }
    else{
        try {
            if (req.body.password){
                req.body.password = md5(req.body.password)
            }else{
                delete req.body.password
            }
            await accounts.updateOne({_id: req.params.id}, req.body)
            req.flash("success", "Cập nhật tài khoản thành công")
            const backURL = req.get('Referer')
            res.redirect(backURL)
        }catch(error) {
            req.flash("error", "Cập nhật tài khoản thất bại")
            res.redirect(`${ADMIN_PATH}/accounts`)
        }
    }
    
}


// [GET] /admin/accounts/detail/:id
module.exports.detail = async (req,res) => {

    
    const account = await accounts.findOne({ _id: req.params.id} )
    const role = await roles.findOne({_id: account.role_id})

    res.render('admin/pages/account/detail.pug', {
        title: "Trang danh sách tài khoản",
        account: account,
        roles: role
    })
}
