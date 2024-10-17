const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();

const add_user_skill = async (req, res) => {
    console.log("in add_user_skill");
    const { id, data } = req.body;
    console.log(id);
  
    try {
      const array = [];
      data.forEach((element) => {
        const d = {};
        d["userId"] = id;
        d["skillId"] = element.skillId;
        d['score'] = element.score;
        array.push(d);
      });
      console.log(array);
  
      // Fetch existing skills for the user from the database
      const existingData = await prisma.UserSkill.findMany({ where: { userId: id } });
  
      if (existingData.length > 0) {
        // Step 1: Filter out new skills that need to be added and skills to be deleted
        const difference1 = array.filter(
          (item) => !existingData.some((respItem) => respItem.skillId === item.skillId)
        );
        const difference2 = existingData.filter(
          (item) => !array.some((arrayItem) => arrayItem.skillId === item.skillId)
        );
  
        // Step 2: Update score for skills that already exist
        await Promise.all(
          array.map(async (element) => {
            const existingSkill = existingData.find((respItem) => respItem.skillId === element.skillId);
            if (existingSkill) {
              // Update score if the skill exists
              await prisma.UserSkill.update({
                where: { id: existingSkill.id },
                data: { score: element.score },
              });
              console.log(`Updated score for skillId: ${element.skillId}`);
            }
          })
        );
  
        // Step 3: Handle adding new skills or deleting removed skills
        if (difference1.length > 0) {
          // Add new skills to the database
          await Promise.all(
            difference1.map(async (element) => {
              await prisma.UserSkill.create({
                data: {
                  userId: element.userId,
                  score: element.score,
                  skillId: element.skillId,
                },
              });
            })
          );
          console.log("Added new skills.");
        }
  
        if (difference2.length > 0) {
          // Delete skills from the database
          await Promise.all(
            difference2.map(async (element) => {
              await prisma.UserSkill.delete({
                where: {
                  id: element.id,
                },
              });
            })
          );
          console.log("Deleted skills.");
        }
  
        res.send({ msg: "User skills updated successfully" });
  
      } else {
        // If the user has no skills, add them as new
        const resp = await prisma.UserSkill.createMany({ data: array });
        res.send({ msg: "User's Skill Added" });
        console.log("Added skills for new user.");
      }
  
    } catch (e) {
      console.log(e);
      res.status(403).send({ msg: e });
    }
  };
  

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

const role_skill_count = async (req, res) => {
  const resp = await prisma.UserSkill.groupBy({
    by:['userId',],
    _count: {
      userId: true,
    },
  });
  console.log(resp)
  res.send({ data: resp });
};

module.exports = {
    add_user_skill,
    get_user_skill,
    role_skill_count
  };