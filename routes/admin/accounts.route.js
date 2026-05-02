const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const controller = require('../../controllers/admin/accounts.controller')
const validate = require('../../validates/admin/account.validate')
const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware')

router.get('/', controller.index)
router.get('/create', controller.create)
router.post('/create',
    upload.single('avatar'), 
    validate.createPost,
    controller.createPost
)
router.get('/edit/:id', controller.edit)
router.post('/edit/:id', 
    upload.single('avatar'), 
    validate.editPatch,
    controller.editPatch)
router.get('/detail/:id', controller.detail)

module.exports = router