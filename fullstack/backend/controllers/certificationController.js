const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();

const view_certification = async (req, res) => {
  console.log("in_view_certification")
  try {
    const resp = await prisma.certification.findMany();
  console.log(resp.length,"in_view_certification");
  res.send({ data: resp });
  } catch (error) {
    res.status(403).send({"msg":e})
  }
  
};

const add_certification = async (req, res) => {
  console.log(req.body.data);
  try {
    const resp = await prisma.certification.create({ data: req.body.data });
    res.send({ msg: "certification Added" });
  } catch (e) {
    res.status(403).send({ msg: e });
  }
};
const update_certification = async (req, res) => {
  console.log(req.body.data);
  try {
    const resp = await prisma.certification.update({ where: { id: req.body.id },data:{...req.body.data} });
    res.send({ msg: "certification Updated" });
  } catch (e) {
    console.log(e);
    res.status(403).send({ msg: e });
  }
};
const delete_certification = async (req, res) => {
    console.log(req.body.data);
    try {
      const resp = await prisma.certification.delete({ where: { id: req.body.id }});
      res.send({ msg: "certification Deleted" });
    } catch (e) {
      console.log(e);
      res.status(403).send({ msg: e });
    }
  };

const hours_count=async(req,res)=>{

    try
    {
    const certifications = await prisma.userCertification.findMany({});
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

module.exports = {
  view_certification,
  add_certification,
  update_certification,
  delete_certification,
  hours_count
};
