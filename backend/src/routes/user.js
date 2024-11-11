//dinh nghia cac api (crud) lien quan den user
import * as controllers from '../controllers';
import express from 'express';
import verifyToken from '../middlewares/verfy_token';
import { isAdmin } from '../middlewares/verify_role';
import uploadCloud from '../middlewares/uploader';

const router = express.Router();

// router.use(verifyToken);


router.use(verifyToken);
// router.post('/logout',verifyToken, controllers.logout)
// router.use(isAdmin);
router.get('/account', controllers.getCurrent);
router.get('/', controllers.getAllUsers);
router.post('/',uploadCloud.single('avatar'), controllers.createNewUser)

router.put('/',uploadCloud.single('avatar'), controllers.updateUser)

router.delete('/', controllers.deleteUser)

module.exports = router;
