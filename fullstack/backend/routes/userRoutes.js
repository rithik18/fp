const express = require('express');
const router = express.Router();
const  jwt = require('jsonwebtoken');

const userController=require('../controllers/userController')
const roleController=require('../controllers/roleController')
const skillController=require('../controllers/skillController')
const roleskillController=require('../controllers/roleskillController')
const userkillController=require('../controllers/userskillController')
const usercertificationController=require('../controllers/usercertificationController')
const certificationController=require('../controllers/certificationController')

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

router.post('/get_role',roleController.get_role)

router.post('/view_skill',skillController.view_skill)

router.post('/view_user_role_skill',roleskillController.view_user_role_skill)

router.post('/add_user_skill',userkillController.add_user_skill)
router.post('/get_user_skill',userkillController.get_user_skill)


router.post('/view_certification',certificationController.view_certification)

router.post('/add_certification',usercertificationController.add_certification)
router.post('/get_certification',usercertificationController.get_certification)
// router.post('/update_user_skill',usercertificationController.)

module.exports = router;