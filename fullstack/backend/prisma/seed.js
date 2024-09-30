const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const roles = [
  {
    name: "Developer",
    desc: "Responsible for writing and maintaining code."
  },
  {
    name: "Designer",
    desc: "Responsible for designing the user interface and experience."
  }
];
const roles1 = [
  {
    name: "Admin",
    desc: "Responsible for everything."
  },
]

const users = [
  {
    name: "Alice",
    role_id: "", // This will be filled later
    joining_date: "2023-01-10",
    department: "Engineering",
    mail: "alice@example.com",
    created_at: new Date(),
    updated_at: new Date(),
    is_active: true
  },
  {
    name: "Bob",
    role_id: "", // This will be filled later
    joining_date: "2023-02-15",
    department: "Design",
    mail: "bob@example.com",
    created_at: new Date(),
    updated_at: new Date(),
    is_active: true
  }
];

const skills = [
  {
    name: "JavaScript",
    created_at: new Date(),
    updated_at: new Date(),
    is_active: true
  },
  {
    name: "TypeScript",
    created_at: new Date(),
    updated_at: new Date(),
    is_active: true
  },
  {
    name: "UI/UX Design",
    created_at: new Date(),
    updated_at: new Date(),
    is_active: true
  }
];

async function seedData() {
  // Insert roles
  await prisma.role.createMany({ data: roles });
  
  // Insert skills
  await prisma.skill.createMany({ data: skills });

  // Fetch the created roles to get their IDs
  const developerRole = await prisma.role.findUnique({ where: { name: "Developer" } });
  const designerRole = await prisma.role.findUnique({ where: { name: "Designer" } });

  // Assign role IDs to users
  users[0].role_id = developerRole.id; // Alice's role
  users[1].role_id = designerRole.id;  // Bob's role

  // Insert users
  await prisma.user.createMany({ data: users });

  // Fetch users to link skills
  const alice = await prisma.user.findUnique({ where: { mail: "alice@example.com" } });
  const bob = await prisma.user.findUnique({ where: { mail: "bob@example.com" } });
  const js = await prisma.skill.findUnique({ where: { name: "JavaScript" } });
  const ts = await prisma.skill.findUnique({ where: { name: "TypeScript" } });
  const uiux = await prisma.skill.findUnique({ where: { name: "UI/UX Design" } });
  
  // Insert user-skill relationships
  await prisma.userSkill.createMany({
    data: [
      { userId: alice.id, skillId:  js.id}, // Replace with actual ID
      { userId: alice.id, skillId:  ts.id}, // Replace with actual ID
      { userId: bob.id, skillId:  uiux.id}   // Replace with actual ID
    ],
  });
}

seedData()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
