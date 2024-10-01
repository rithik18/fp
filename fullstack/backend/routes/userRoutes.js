const express = require('express');
const router = express.Router();
const {adminMiddleware} = require('../middlewares/adminMiddleware');


router.post('/',(req,res)=>{
    res.send({"hell":"hell0"})
})
module.exports = router;