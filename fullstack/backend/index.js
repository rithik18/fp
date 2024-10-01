const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { adminMiddleware } = require("./middlewares/adminMiddleware");
const { userMiddleware } = require("./middlewares/userMiddleware");

const prisma = new PrismaClient();
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Login Route
app.post("/role", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { mail: email } });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Optionally, attach user info to the request for middleware usage
    req.data = user; // Attach user object to the request
    console.log(req.data)
    // Send user information back, including department
    res.status(200).send({
      message: `Welcome ${email}`,
      department: user.department,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Protecting the admin and user routes
app.use("/admin", adminMiddleware, adminRoutes);
app.use("/user", userMiddleware, userRoutes);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is successfully running on port ${PORT}`);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});


