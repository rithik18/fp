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
const get_admin_certification = async (req, res) => {
    console.log("in get_admin_certificate");  
    try {
     const resp=await prisma.userCertification.findMany({where:{isVerified:false}})
     console.log(resp.length,"in get_admin_certificate")
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
     const resp=await prisma.userCertification.findMany({
      where:
      {
        userId:id,
        certification: {
          is_certificate: true, // Filter for is_certificate: false
        },
      }})
     res.send({data:resp.length})
    } catch (e) {
      console.log(e);
      res.status(403).send({ msg: e });
    }
  };


async function getTotalDuration(req,res) {
  try
  {
  const { id } = req.body;
  console.log("in_duration")
  const certifications = await prisma.userCertification.findMany({
    where:{
      userId:id
    },
  });
  var sum=0
  console.log(certifications.length,"cert")
  certifications.map((cert) => {
    const startDate = new Date(cert.started_at);
    const endDate = new Date(cert.completed_at);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    // Calculate the difference in milliseconds
    const durationMs = endDate.getTime() - startDate.getTime();
    sum+=durationMs
  });

  const totalDurationInDays = sum / (1000 * 60 * 60 * 24); // Convert from milliseconds to days

  res.send({data:totalDurationInDays});
}catch(e){
  console.log(e);
  res.status(403).send({ msg: e });
}
}

  const update_certification=async(req,res)=>{
    console.log("in_update")
    const { data } = req.body;
    if (!Object.values(competency).includes(data.competency)) {
      console.log(data.competency)
      console.log("Available competencies:", Object.values(competency));
      console.log("Received competency:", competency);
      return res.status(400).send('Invalid competency level');
    }
    console.log({imageData:data.imageData,started_at:data.started_at.to,completed_at:data.completed_at},'update')
  try {
    const resp = await prisma.userCertification.update({ where: { userId_certificationId_competency: {
      userId: data.userId,
      certificationId: data.certificationId,
      competency: data.competency
    }},data:{imageData:data.imageData,started_at:data.started_at.to,completed_at:data.completed_at} });
    res.send({ msg: "Role Updated" });
  } catch (e) {
    console.log(e);
    res.status(403).send({ msg: e });
  }
  }
  const verify=async(req,res)=>{
    console.log("verify")
    const { data } = req.body;
  try {
    const resp = await prisma.userCertification.update({ where: { userId_certificationId_competency: {
      userId: data.userId,
      certificationId: data.certificationId,
      competency: data.competency
    }},data:{isVerified:true} });
    res.send({ msg: "Role Updated" });
  } catch (e) {
    console.log(e);
    res.status(403).send({ msg: e });
  }
  }
  const reject=async(req,res)=>{
    console.log("reject")
    const { data } = req.body;
  try {
    const resp = await prisma.userCertification.delete({ where: { userId_certificationId_competency: {
      userId: data.userId,
      certificationId: data.certificationId,
      competency: data.competency
    }}});
    res.send({ msg: "Certificate Rejected" });
  } catch (e) {
    console.log(e);
    res.status(403).send({ msg: e });
  }
  }
  const findDeptWiseTimeSpent = async (req, res) => {
    try {
      // Get the current date if needed for calculations
      const currentDate = new Date();
  
      // Fetch user certifications with role details
      const certifications = await prisma.userCertification.findMany({
        select: {
          started_at: true,
          completed_at: true,
          user: {
            select: {
              role: {
                select: {
                  name: true, // Fetch role name
                },
              },
            },
          },
        },
      });
  
      
  
      const roleWiseTimeSpent = {};
  
      certifications.forEach(cert => {
        const { started_at, completed_at, user } = cert;  
        // Calculate the duration in milliseconds
        const duration = new Date(completed_at) - new Date(started_at);
        console.log(cert)
  
        // Convert duration to hours (or any other unit you prefer)
        const durationInHours = duration / (1000 * 60 * 60); // Convert milliseconds to hours
  
        const role = user.role.name;
        if (!roleWiseTimeSpent[role]) {
          roleWiseTimeSpent[role] = 0;
        }
  
        // Accumulate the time spent for each role
        roleWiseTimeSpent[role] += durationInHours;
      });
  
      // Convert the result object to an array if needed
      const result = Object.entries(roleWiseTimeSpent).map(([role, timeSpent]) => ({
        role,
        totalTimeSpent: timeSpent,
      }));
  
  console.log("befroe send")
      res.send({ data: result });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'An error occurred while fetching data.' });
    }
  };
  const user_skill_level_distribution=async (req, res) => {
    try {
      const skillLevelDistribution = await prisma.userCertification.groupBy({
        by: 'competency',
        _count: {
          competency: true,
        },
      });
      const data=skillLevelDistribution.map((e)=>({
        competency:e.competency,
        count:e._count.competency
      }))
      res.send({data:data});
    } catch (error) {
      console.log(error,"error")
      res.status(500).json({ error: 'Failed to fetch skill level distribution.' });
    }
  };
  
  
  
  
  module.exports={
    add_certification,
    get_certification,
    update_certification,
    get_certification_count,
    get_course_count,
    getTotalDuration,
    get_admin_certification,
    verify,
    reject,
    findDeptWiseTimeSpent,
    user_skill_level_distribution
  }