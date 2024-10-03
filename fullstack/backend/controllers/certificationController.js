const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();

const view_certification = async (req, res) => {
  const resp = await prisma.certification.findMany();
  console.log(resp.length);
  res.send({ data: resp });
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
module.exports = {
  view_certification,
  add_certification,
  update_certification,
  delete_certification
};
