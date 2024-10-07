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
const get_course_count = async (req, res) => {
    console.log("in get_certificate");
    const { id } = req.body;
    console.log(id);
  
    try {
      const resp = await prisma.userCertification.findMany({
        where: {
          userId: id,
          certification: {
            is_certificate: false, // Filter for is_certificate: false
          },
        },
        include: {
          certification: true, // Include certification details if needed
        },
      });
     res.send({data:resp.length})
    } catch (e) {
      console.log(e);
      res.status(403).send({ msg: e });
    }
  };
const get_certification_count = async (req, res) => {
    console.log("in get_certificate");
    const { id } = req.body;
    console.log(id);
  
    try {
     const resp=await prisma.userCertification.findMany({where:{userId:id}})
     res.send({data:resp.length})
    } catch (e) {
      console.log(e);
      res.status(403).send({ msg: e });
    }
  };
  const update_certification=async(req,res)=>{
    console.log("in_update")
    const { data } = req.body;
    if (!Object.values(competency).includes(data.competency)) {
      console.log(data.competency)
      console.log("Available competencies:", Object.values(competency));
      console.log("Received competency:", competency);
      return res.status(400).send('Invalid competency level');
    }
    console.log(data.userId,data.certificationId,data.competency)
  try {
    const resp = await prisma.userCertification.update({ where: { userId_certificationId_competency: {
      userId: data.userId,
      certificationId: data.certificationId,
      competency: data.competency
    }},data:{imageData:data.imageData,started_at:data.started_at,completed_at:data.completed_at} });
    res.send({ msg: "Role Updated" });
  } catch (e) {
    console.log(e);
    res.status(403).send({ msg: e });
  }
  }
  module.exports={
    add_certification,
    get_certification,
    update_certification,
    get_certification_count,
    get_course_count
  }