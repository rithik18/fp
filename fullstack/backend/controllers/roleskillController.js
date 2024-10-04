const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();

const view_role_skill = async (req, res) => {
  const resp = await prisma.RoleSkill.findMany();
  console.log(resp.length);
  res.send({ data: resp });
};

const add_role_skill = async (req, res) => {
  console.log(req.body.data);
  try {
    const resp = await prisma.RoleSkill.create({ data: req.body.data });
    res.send({ msg: "Skill Added" });
  } catch (e) {
    res.status(403).send({ msg: e });
  }
};
const update_role_skill = async (req, res) => {
  console.log(req.body.data);
  try {
    const resp = await prisma.RoleSkill.update({ where: { id: req.body.id },data:{...req.body.data} });
    res.send({ msg: "Skill Updated" });
  } catch (e) {
    console.log(e);
    res.status(403).send({ msg: e });
  }
};
const delete_role_skill = async (req, res) => {
    console.log(req.body.data);
    try {
      const resp = await prisma.RoleSkill.delete({ where: { id: req.body.id }});
      res.send({ msg: "Skill Deleted" });
    } catch (e) {
      console.log(e);
      res.status(403).send({ msg: e });
    }
  };
module.exports = {
  view_role_skill,
  add_role_skill,
  update_role_skill,
  delete_role_skill
};
