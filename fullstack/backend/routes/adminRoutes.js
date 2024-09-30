const express = require('express');
const router = express.Router();
const {adminMiddleware} = require('../middlewares/adminMiddleware');

router.use(adminMiddleware)

// router.use('/login')
