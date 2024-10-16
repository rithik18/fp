const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();

const view_skill = async (req, res) => {
  const resp = await prisma.skill.findMany();
  console.log(resp.length);
  res.send({ data: resp });
};

const add_skill = async (req, res) => {
  console.log(req.body.data);
  try {
    const resp = await prisma.skill.create({ data: req.body.data });
    res.send({ msg: "Skill Added" });
  } catch (e) {
    res.status(403).send({ msg: e });
  }
};
const update_skill = async (req, res) => {
  console.log(req.body.data);
  try {
    const resp = await prisma.skill.update({ where: { id: req.body.id },data:{...req.body.data} });
    res.send({ msg: "Skill Updated" });
  } catch (e) {
    console.log(e);
    res.status(403).send({ msg: e });
  }
};
const delete_skill = async (req, res) => {
    console.log(req.body.data);
    try {
      const resp = await prisma.skill.delete({ where: { id: req.body.id }});
      res.send({ msg: "Skill Deleted" });
    } catch (e) {
      console.log(e);
      res.status(403).send({ msg: e });
    }
  };
  const skillUserCounts = async (req,res)=>{
    const data=await prisma.skill.findMany({
    select: {
      id: true,
      name: true,
      User: {
        select: {
          userId: true,
        },
      },
    },
  })
  
  const skillCounts = data.map(skill => ({
    skillName: skill.name,
    userCount: skill.User.length, // Count users per skill
  }));
  res.send({ data: skillCounts });

  }
module.exports = {
  view_skill,
  add_skill,
  update_skill,
  delete_skill,
  skillUserCounts
};
