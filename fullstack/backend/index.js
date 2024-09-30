
const express = require('express');

const app = express();
const PORT = 3000;

const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma=new PrismaClient()
app.use(cors());
app.use(express.json());


const user = require('./routes/userRoutes');
const admin = require('./routes/adminRoutes');




app.post('/login', async (req, res)=>{
    const {email}=req.body
    res.status(200);
    const data = await prisma.user.findUnique({where:{mail:email}})
    console.log(data.department)
    if(data.department!='ADMIN'){
        app.use('/admin', admin);
    }else{
        app.use('/user', user);
    }
    res.send(`Welcome ${email}${department}`);
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
