const express = require('express');
const router = express.Router();
const  jwt = require('jsonwebtoken');

const userController=require('../controllers/userController')

router.post('/',(req,res)=>{
    if(req.token){
        return res.json({'auth':'true'})
    }
    const {id,email,password,department}=req.data
    const token= jwt.sign({id,email,password,department}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN, // Set expiration time from env
      });
      return res.send({token,'auth':'true',data:req.data})//return jwt token
})
router.post('/update_user_data',userController.update_user_data)

module.exports = router;