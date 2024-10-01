
// const express = require('express');

// const app = express();
// const PORT = 3000;

// const cors = require('cors');
// const { PrismaClient } = require('@prisma/client');
// const prisma=new PrismaClient()
// app.use(cors());
// app.use(express.json());


// const user = require('./routes/userRoutes');
// const admin = require('./routes/adminRoutes');




// app.post('/login', async (req, res)=>{
//     const {email}=req.body
//     res.status(200);
//     const data = await prisma.user.findUnique({where:{mail:email}})
//     console.log(data.department)
//     if(data.department=='ADMIN'){
//         app.use('/admin', admin);
//     }else{
//         app.use('/user', user);
//     }
//     res.send(`Welcome ${email}${department}`);
// });

// app.listen(PORT, (error) =>{
//     if(!error)
//         console.log("Server is Successfully Running,and App is listening on port "+ PORT)
//     else 
//         console.log("Error occurred, server can't start", error);
//     }
// );
const express = require('express');
const app = express();

// Mock user data
const users = [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'user' }
];

// Middleware to check user role
const checkRole = (requiredRole) => {
    return (req, res, next) => {
        const userId = req.userId; // Assume user ID is set in request
        const user = users.find(u => u.id === userId);

        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }

        if (user.role !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden: Insufficient role' });
        }

        next(); // Role is valid, proceed
    };
};

// Mock authentication middleware
app.use((req, res, next) => {
    // Simulate user with ID 1 (admin) or ID 2 (user)
    req.userId = 1; // Change this to 2 to test user access
    next();
});

// Protected routes
app.get('/admin', checkRole('admin'), (req, res) => {
    res.send('Welcome, Admin!');
});

app.get('/user', checkRole('user'), (req, res) => {
    res.send('Welcome, User!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
