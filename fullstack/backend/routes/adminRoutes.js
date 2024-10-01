const express = require('express');
const router = express.Router();

router.post('/',(req,res)=>{
    console.log("first")
    res.send({"hell":"hell"})
})
module.exports = router;