// middlewares/userMiddleware.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const userMiddleware = async (req, res, next) => {
  const { email,password } = req.body;
  const user = await prisma.user.findUnique({ where: { mail: email,password: password} });
    if (user && user.department !== 'ADMIN') {
      return next();
    }
    return res.status(403).send("Access denied");
  };
  
  module.exports = { userMiddleware };
  