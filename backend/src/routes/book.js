import * as controllers from '../controllers';
import express from 'express';
import verifyToken from '../middlewares/verfy_token';
import { isCreatorOrAdmin, isAdmin } from '../middlewares/verify_role'
import uploadCloud from '../middlewares/uploader';
const router = express.Router()

//public routes


router.get('/:id', controllers.getBookById);
router.get('/', controllers.getBooks)
// router.use(isAdmin)
router.use(verifyToken)
//private routes

// router.use(isCreatorOrAdmin)

// router.post('/', uploadCloud.single('image'), controllers.createNewBook)

// router.post('/', uploadCloud.single('image'), controllers.createNewBook)
// router.post('/', controllers.createNewBook)
router.post('/',uploadCloud.single('image'), controllers.createNewBook)


//image là key của biến chứa file ảnh (trong database)
// router.put('/', uploadCloud.single('image'), controllers.updateBook)
router.put('/',uploadCloud.single('image'), controllers.updateBook)

//khi gọi api hàm xóa, bắt buộc phải truyền vào mảng, do đã được thiết lập trong Joi
//ví dụ:
//http://localhost:5000/api/v1/book?name=book&bids[0]=dsdsdsds&bids[1]
router.delete('/', controllers.deleteBook)
module.exports = router