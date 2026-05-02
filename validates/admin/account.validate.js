module.exports.createPost = (req,res,next) => {
    if(!req.body.fullName){
        req.flash('error','Vui lòng nhập họ và tên')
        const backUrl = req.get('Referer')
        res.redirect(backUrl);
        return;
    }
    if(!req.body.email){
        req.flash('error','Vui lòng nhập email')
        const backUrl = req.get('Referer')
        res.redirect(backUrl);
        return;
    }
    if(!req.body.password){
        req.flash('error','Vui lòng nhập mật khẩu')
        const backUrl = req.get('Referer')
        res.redirect(backUrl);
        return;
    }
    if(!req.body.phone){
        req.flash('error','Vui lòng nhập số điện thoại')
        const backUrl = req.get('Referer')
        res.redirect(backUrl);
        return;
    }
    if(!req.body.role_id){
        req.flash('error','Vui lòng chọn quyền')
        const backUrl = req.get('Referer')
        res.redirect(backUrl);
        return;
    }
    next()
}

module.exports.editPatch = (req,res,next) => {
    if(!req.body.fullName){
        req.flash('error','Vui lòng nhập họ và tên')
        const backUrl = req.get('Referer')
        res.redirect(backUrl);
        return;
    }
    if(!req.body.email){
        req.flash('error','Vui lòng nhập email')
        const backUrl = req.get('Referer')
        res.redirect(backUrl);
        return;
    }
    if(!req.body.phone){
        req.flash('error','Vui lòng nhập số điện thoại')
        const backUrl = req.get('Referer')
        res.redirect(backUrl);
        return;
    }
    if(!req.body.role_id){
        req.flash('error','Vui lòng chọn quyền')
        const backUrl = req.get('Referer')
        res.redirect(backUrl);
        return;
    }
    next()
}