const { PrismaClient, Role } = require("@prisma/client");
const { response } = require("express");
const prisma = new PrismaClient();

const view_user = async (req, res) => {
  console.log("in_get_all_user")
  try {
    const resp = await prisma.user.findMany();
    console.log(resp.length,"in_get_all_user");
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
  // console.log(data)
  try {
    const user = await prisma.user.findMany({
      where: {
        mail: data.mail,
        NOT: {
          id: data.id,
        },
      },
    });
  
  console.log(user.length)
    if(user.length>0){
      res.status(403).send({"msg":"MailId Exsist"})
      return
    }
    const resp = await prisma.user.update(
      {where:{
        id:data.id
      },
    data:{
      mail:data.mail,
      name:data.name,
      profileImage:data.profileImage,
      updated_at:new Date().toISOString()
    }}
    )
    res.send({"msg":"Updated successfully","status":resp.status});
  } catch (error) {
    console.log("in error")
    console.log(error)
    res.status(403).send(error);
  }
};

module.exports = {
  view_user,
  add_user,
  bulk_add_user,
  delete_user,
  update_user_data,
};
