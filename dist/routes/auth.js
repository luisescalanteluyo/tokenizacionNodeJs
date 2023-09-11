"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post('/signin', auth_controller_1.signin);
router.get('/verify', auth_controller_1.verify);
/*router.get('/',(req,res)=>{
    res.send("hello");
});*/
exports.default = router;
//# sourceMappingURL=auth.js.map