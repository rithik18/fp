const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();


const add_user_skill=async(req,res)=>{
    console.log("in add_user_skill")
    const {id,data} =req.body
    console.log(id)
    
  try {
    const array = [];
    data.forEach((element) => {
      const d = {};
      d["userId"] = id;
      d["skillId"] = element.skillId;
      d['score']=element.score
      array.push(d);
    });
    console.log(array);
    console.log(array);
    const data=await prisma.UserSkill.findMany({where:{userId:id}})
    if(data.length>0){

    }else{
        const resp = await prisma.UserSkill.updateMany({ data: array });
    res.send({ msg: "User's Skill Added" });
    console.log("hell");

    }

    
  } catch (e) {
    console.log(e);
    res.status(403).send({ msg: e });
  }
}

const get_user_skill=async(req,res)=>{
    console.log("in get_user_skill")
    const {id} =req.body
    console.log(id)
    
  try {
    const resp = await prisma.UserSkill.findMany({where:{userId:id}});
    console.log(resp,"159")
    res.send({ data:resp });
    console.log("hell");
  } catch (e) {
    console.log(e);
    res.status(403).send({ msg: e });
  }
}


module.exports = {
    add_user_skill,
    get_user_skill
  };