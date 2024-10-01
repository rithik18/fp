const express = require('express');
const router = express.Router();
const  jwt = require('jsonwebtoken');

router.post('/',(req,res)=>{
    const {email,password,department}=req.data
    const token= jwt.sign({email,password,department}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN, // Set expiration time from env
      });
      console.log(token)
      return res.json({token})
})
module.exports = router;