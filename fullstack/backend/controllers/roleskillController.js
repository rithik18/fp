const { PrismaClient, Role } = require("@prisma/client");
const prisma = new PrismaClient();

const view_role_skill = async (req, res) => {
  const resp = await prisma.RoleSkill.findMany();
  console.log(resp.length);
  res.send({ data: resp });
};

const add_role_skill = async (req, res) => {
  const { RoleId, department, skill } = req.body.data;
  try {
    const array = [];
    skill.forEach((element) => {
      const d = {};
      d["RoleId"] = RoleId;
      d["department"] = department;
      d["skillId"] = element.id;
      array.push(d);
    });
    console.log(array.length);
    const resp = await prisma.RoleSkill.createMany({ data: array });
    res.send({ msg: "Roles's Skill Added" });
    console.log("hell");
  } catch (e) {
    console.log(e);
    res.status(403).send({ msg: e });
  }
};
const update_role_skill = async (req, res) => {
  const { RoleId, department, skill } = req.body.data;
  try {
    const array = [];
    skill.forEach((element) => {
      const d = {};
      d["RoleId"] = RoleId;
      d["department"] = department;
      d["skillId"] = element.id;
      array.push(d);
    });
    const resp = await prisma.RoleSkill.findMany({
      where: { RoleId: RoleId, department: department },
    });

    const difference1 = array.filter(
      (item) => !resp.some((respItem) => respItem.skillId === item.skillId)
    );
    const difference2 = resp.filter(
      (item) => !array.some((arrayItem) => arrayItem.skillId === item.skillId)
    );

    const uniqueItems = [...difference1, ...difference2];

    console.log(uniqueItems, uniqueItems.length, "hell");

    if (uniqueItems.length > 0) {
      // If there are unique items, we need to decide to add or delete
      if (array.length > resp.length) {
        // Add new skills to the database
        await Promise.all(
          difference1.map(async (element) => {
            await prisma.RoleSkill.create({
              data: {
                RoleId: RoleId,
                department: department,
                skillId: element.skillId, // Assuming you want to add this field
              },
            });
          })
        );
        console.log("Added new skills.");
      } else {
        // Delete skills from the database
        await Promise.all(
          difference2.map(async (element) => {
            await prisma.RoleSkill.delete({
              where: {
                id: element.id, // Ensure `id` exists in the element
              },
            });
          })
        );
        console.log("Deleted skills.");
      }
    } else {
      console.log("No changes needed.");
    }

    res.send({ msg: "Roles's Skill updated successfully" });
    console.log("hell1");
  } catch (e) {
    console.log(e);
    res.status(403).send({ msg: e });
  }
};
const delete_role_skill = async (req, res) => {
  const { RoleId, department, skills } = req.body.data;

  try {
    const deletePromises = skills.map(async (element) => {
      return prisma.RoleSkill.delete({
        where: {
          RoleId_skillId_department: {
            RoleId: RoleId,
            skillId: element.skillId,
            department: department,
          },
        },
      });
    });

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);

    res.send({ msg: "Skills deleted successfully" });
    console.log("Deletion completed");
  } catch (e) {
    console.log(e);
    res
      .status(403)
      .send({ msg: e.message || "An error occurred during deletion" });
  }
};

module.exports = {
  view_role_skill,
  add_role_skill,
  update_role_skill,
  delete_role_skill,
};
