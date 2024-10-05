const { PrismaClient, Role } = require("@prisma/client");
const { response } = require("express");
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
    const resp = await prisma.user.delete({ where: { id: req.body.id } });
    res.send({ msg: "User Deleted" });
  } catch (error) {
    res.send(error);
  }
};


const update_user_data = async (req, res) => {
  console.log("in user");
  const { data } = req.body;
  try {
    console.log(data.id,data.name,data.mail,data.profileImage.slice(0,50));
    const resp = await prisma.user.update(
      {where:{
        id:data.id
      },
    data:{
      mail:data.mail,
      name:data.name,
      profileImage:data.profileImage
    }}
    )
    res.send({"msg":"Updated successfully","status":resp.status});
  } catch (error) {
    console.log("in error")
    res.send(error);
  }
};

module.exports = {
  view_user,
  add_user,
  bulk_add_user,
  delete_user,
  update_user_data,
};
