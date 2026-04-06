module.exports.createPost = (req,res,next) => {
    if(!req.body.title){
        req.flash('error','Vui lòng nhập tiêu đề')
        const backUrl = req.get('Referer') || `/${PATH_ADMIN}/products`; 
        res.redirect(backUrl);
        return;
    }
    next()
}