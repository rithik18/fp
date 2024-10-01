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
      return res.json({token,'auth':'true',data:req.data})//return jwt token
})

router.post('/view_user',userController.view_user)
router.post('/add_user',userController.add_user)
// router.post('/edit_user')
// router.post('/delete_user')

// router.post('/view_skill')
// router.post('/add_skill')
// router.post('/edit_skill')
// router.post('/delete_skill')

// router.post('/view_role')
// router.post('/add_role')
// router.post('/edit_role')
// router.post('/delete_role')

// router.post('/view_certification')
// router.post('/add_certification')
// router.post('/edit_certification')
// router.post('/delete_certification')

// router.post('/view_role_skill')
// router.post('/add_role_skill')
// router.post('/edit_role_skill')
// router.post('/delete_role_skill')


module.exports = router;