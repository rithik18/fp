// middlewares/userMiddleware.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const  jwt = require('jsonwebtoken');
const userMiddleware = async (req, res, next) => {
  const { token } = req.body;
  if (token) {
    var decoded =await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send('Unauthorized: Invalid token');
        } else {
          resolve(decoded)  
        }
      });
    }) 
    // const { email, password } = decoded;
    console.log(decoded)

    if (!decoded) {
      return res.status(404).send("User not found");
    }
    if (decoded && decoded.department?.toUpperCase() !== "ADMIN") {
      req.data = decoded;
      req.token=token
      return next();
    }
  }
  else{
    const { email,password } = req.body;
  const user = await prisma.user.findUnique({ where: { mail: email,password: password} });
    if (user && user.department !== 'ADMIN') {
      req.data=user
      return next();
    }
  }
    return res.status(403).send("Access denied");
  };
  
  module.exports = { userMiddleware };
  