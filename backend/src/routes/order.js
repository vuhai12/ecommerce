import * as controllers from '../controllers';
import express from 'express';
import verifyToken from '../middlewares/verfy_token';
import { isCreatorOrAdmin, isAdmin } from '../middlewares/verify_role'
import uploadCloud from '../middlewares/uploader';
const router = express.Router()

router.use(verifyToken)
router.use(isCreatorOrAdmin)

router.post('/', controllers.createOrder)
router.get('/id', controllers.getOrderById)

router.get('/', controllers.getOrders)
// router.delete('/', controllers.deleteOrder)
module.exports = router