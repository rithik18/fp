const { PrismaClient,Role } = require('@prisma/client');
const prisma = new PrismaClient();

const view_user=async(req,res)=>{
    const resp=await prisma.user.findMany()
    console.log(resp.length)
    res.send({data:resp})
}

const add_user=async(req,res)=>{
    console.log(req.body.data)
    const resp=await prisma.user.create({data:req.body.data})
    res.send({"msg":"User Added"})

}


module.exports = {
    view_user,
    add_user
  };
  