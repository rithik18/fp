
const { PrismaClient,Role } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken'); // If you're using JWT for authentication

const adminMiddleware = async (req, res, next) => {
  const token = req.headers['token'];
  if(req.url=="/login"){
    console.log("first1")
    next()
  }else{
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
    var decoded =await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded)  
        }
      });
    }) 
    // console.log("decoded")
    // if (decoded.role === 'ADMIN') {
      
    //   req.user = decoded; 
    //   var result = await prisma.user.findUnique({
    //     where:{
    //       email:decoded.email,
    //     }
    //   })
    //   // console.log("first111",result,decoded.password)
    //   if(result.password==decoded.password){
    //     // console.log("first222")
    //       // console.log(decoded,"decoded")
    //       next(); 
    //     }
    //   } else {
    //     res.status(403).json({ message: 'Not authorized as admin' });
    //   }
  }
  
  

};

module.exports = {adminMiddleware};
