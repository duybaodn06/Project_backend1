const accounts = require('../../models/accounts.model')
const md5 = require('md5')
const systemconfig = require('../../config/system')
const PATH_ADMIN = systemconfig.prefixadmin

// [GET] /admin/auth/login
module.exports.login = (req,res) => {
    if (req.cookies.token){
        res.redirect(`${PATH_ADMIN}/dashboard`)
    }
    else{
        res.render('admin/pages/auth/login.pug',{
            title: "Trang đăng nhập"
        })
    }
    
}

// [POST] /admin/auth/login
module.exports.loginPost = async (req,res) => {
    const email = req.body.email
    const password = req.body.password
    const user = await accounts.findOne({
        email: email,
        password: md5(password)
    })

    if (!user){
        req.flash('error', "Tài khoản hoặc mật khẩu không tồn tại")
        const backURL = req.get('Referer')
        res.redirect(backURL)
        return
    }
    if (user.status == "inactive"){
        req.flash('error', "Tài khoản đã bị khóa")
        const backURL = req.get('Referer')
        res.redirect(backURL)
        return
    }

    res.cookie('token', user.token)
    req.flash('success', "Đăng nhập thành công")
    res.redirect(`${PATH_ADMIN}/dashboard`)

}

// [GET] /admin/auth/login
module.exports.logout = (req,res) => {
    res.clearCookie('token')
    res.redirect(`${PATH_ADMIN}/auth/login`)
}