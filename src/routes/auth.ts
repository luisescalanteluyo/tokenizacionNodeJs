import {Router} from 'express';
import {singup,signin,verify,booktest 
} from '../controllers/auth.controller'

const router: Router= Router();

router.post('/signup',singup); 
router.post('/signin',signin);
router.get('/verify',verify);
router.post('/book', booktest);

/*router.get('/',(req,res)=>{
    res.send("hello");
});*/

export default router;