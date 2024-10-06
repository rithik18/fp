const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();

const view_role = async (req, res) => {
  const resp = await prisma.role.findMany();
  console.log(resp.length);
  res.send({ data: resp });
};

const add_role = async (req, res) => {
  console.log(req.body.data);
  try {
    const resp = await prisma.role.create({ data: req.body.data });
    res.send({ msg: "Role Added" });
  } catch (e) {
    res.status(403).send({ msg: e });
  }
};
const update_role = async (req, res) => {
  console.log(req.body.data);
  try {
    const resp = await prisma.role.update({ where: { id: req.body.id },data:{...req.body.data} });
    res.send({ msg: "Role Updated" });
  } catch (e) {
    console.log(e);
    res.status(403).send({ msg: e });
  }
};
const delete_role = async (req, res) => {
    console.log(req.body.data);
    try {
      const resp = await prisma.role.delete({ where: { id: req.body.id }});
      res.send({ msg: "Role Deleted" });
    } catch (e) {
      console.log(e);
      res.status(403).send({ msg: e });
    }
  };
  const get_role=async(req,res)=>{
    const { id } = req.body;
    console.log("in getrole")
    try {
      const role = await prisma.role.findUnique({
        where: {
          id: id,
        },
      });
      console.log(role)
      res.send({"role":role.name})
    }catch(error){
      console.log("in error")
      console.log(error)
      res.status(403).send(error);
    }
  }
module.exports = {
  view_role,
  add_role,
  update_role,
  delete_role,
  get_role
};
