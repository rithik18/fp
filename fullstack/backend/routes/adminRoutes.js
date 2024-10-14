const express = require('express');
const router = express.Router();
const  jwt = require('jsonwebtoken');

const userController=require('../controllers/userController')
const skillController=require('../controllers/skillController')
const roleController=require('../controllers/roleController')
const certificationController=require('../controllers/certificationController')
const roleskillController=require('../controllers/roleskillController')
const usercertificationController=require('../controllers/usercertificationController')
const userskillController=require('../controllers/userskillController')

router.post('/',(req,res)=>{
    if(req.token){
        return res.json({'auth':'true'})
    }
    const {id,email,password,department}=req.data
    const token= jwt.sign({id,email,password,department}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN, // Set expiration time from env
      });
      return res.send({token,auth:'true',data:req.data})//return jwt token
})

router.post('/view_user',userController.view_user)
router.post('/add_user',userController.add_user)
router.post('/bulk_add_user',userController.bulk_add_user)
router.post('/delete_user',userController.delete_user)

router.post('/view_skill',skillController.view_skill)
router.post('/add_skill',skillController.add_skill)
router.post('/edit_skill',skillController.update_skill)
router.post('/delete_skill',skillController.delete_skill)

router.post('/view_role',roleController.view_role)
router.post('/add_role',roleController.add_role)
router.post('/edit_role',roleController.update_role)
router.post('/delete_role',roleController.delete_role)

router.post('/view_certification',certificationController.view_certification)
router.post('/add_certification',certificationController.add_certification)
router.post('/edit_certification',certificationController.update_certification)
router.post('/delete_certification',certificationController.delete_certification)

router.post('/view_role_skill',roleskillController.view_role_skill)
router.post('/add_role_skill',roleskillController.add_role_skill)
router.post('/edit_role_skill',roleskillController.update_role_skill)
router.post('/delete_role_skill',roleskillController.delete_role_skill)

router.post('/get_admin_certification',usercertificationController.get_admin_certification)
router.post('/verify',usercertificationController.verify)
router.post('/reject',usercertificationController.reject)

router.post('/user_count',userController.view_user_count)
router.post('/skilled_user_count',userskillController.role_skill_count)
router.post('/hours_count',certificationController.hours_count)
router.post('/role_count',roleController.role_count)



module.exports = router;