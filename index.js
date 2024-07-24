require('dotenv').config();

const express = require('express')
const app = express()
const port = 3000


// importing router 
const authRoute = require('./src/routes/auth.routes');
const startDatabase = require('./src/db/mongoDb');

// registering router   
app.use(express.json()) // using JSON parser
app.use('/api/v1/',authRoute);

// starting application
startDatabase();
app.use('/',(req,res,next)=>res.status(404).json({msg:"route not available"}));
app.listen(port, () => console.log(`🚀 Server started on port ${port}`));