const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();

const view_user = async (req, res) => {
  try {
    const resp = await prisma.user.findMany();
    console.log(resp.length);
    res.send({ data: resp });
  } catch (error) {
    res.send(error);
  }
};

const add_user = async (req, res) => {
  try {
    console.log(req.body.data);
    const resp = await prisma.user.create({ data: req.body.data });
    res.send({ msg: "User Added" });
  } catch (error) {
    res.send(error);
  }
};
const bulk_add_user = async (req, res) => {
  try {
    const resp = await prisma.user.createMany({ data: req.body.data });
    res.send({ msg: "User Added" });
  } catch (error) {
    res.send(error);
  }
};
const delete_user = async (req, res) => {
    try {
      const resp = await prisma.user.delete({ where: {id:req.body.id} });
      res.send({ msg: "User Deleted" });
    } catch (error) {
      res.send(error);
    }
  };

module.exports = {
  view_user,
  add_user,
  bulk_add_user,
  delete_user
};
