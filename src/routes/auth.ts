import {Router} from 'express';
import {signin,verify} from '../controllers/auth.controller'

const router: Router= Router();


router.post('/signin',signin);
router.get('/verify',verify);


export default router;