const { PrismaClient, competency } = require("@prisma/client");
const { response } = require("express");
const prisma = new PrismaClient();



const add_certification = async (req, res) => {
    console.log("in add_certificate");
    const { data } = req.body;
    console.log(data.userId);
    if (!Object.values(competency).includes(data.competency)) {
      console.log(data.competency)
      console.log("Available competencies:", Object.values(competency));
      console.log("Received competency:", competency);
      return res.status(400).send('Invalid competency level');
    }
    try {
     const resp=await prisma.userCertification.create({data:data})
     res.send({"msg":"Certificate Added successfully"})
    } catch (e) {
      console.log(e);
      res.status(403).send({ msg: e });
    }
  };
const get_certification = async (req, res) => {
    console.log("in get_certificate");
    const { id } = req.body;
    console.log(id);
  
    try {
     const resp=await prisma.userCertification.findMany({where:{userId:id}})
     res.send({data:resp})
    } catch (e) {
      console.log(e);
      res.status(403).send({ msg: e });
    }
  };
  module.exports={
    add_certification,
    get_certification
  }