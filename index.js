require('dotenv').config();

const express = require('express')
const app = express()
const port = 3000

// initial imorts
const startDatabase = require('./src/db/mongoDb');

// importing router 
const authRoute = require('./src/routes/auth.routes');
const adminRoute = require('./src/routes/admin.routes');


// registering router   
app.use(express.json()) // using JSON parser
app.use('/api/v1/',authRoute);
app.use('/api/v1/',adminRoute);

// starting application
startDatabase();
app.use('/',(req,res,next)=>res.status(404).json({msg:"route not available"}));
app.listen(port, () => console.log(`🚀 Server started on port ${port}`));