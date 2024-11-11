import * as controllers from '../controllers';
import express from 'express';
import verifyToken from '../middlewares/verfy_token';
import { isCreatorOrAdmin, isAdmin } from '../middlewares/verify_role'
import uploadCloud from '../middlewares/uploader';
const router = express.Router()

// router.use(verifyToken)
//public routes
// router.use(verifyToken)

router.use(verifyToken)

router.get('/', controllers.getProfileUserById)





module.exports = router