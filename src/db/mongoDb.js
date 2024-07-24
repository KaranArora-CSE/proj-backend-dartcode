const mongoose = require('mongoose');
const database = process.env.DB_URI;

async function startDatabase(){
    try{
        let client = await mongoose.connect(database);
        console.log("🚀 Mongo DB Started ... ")
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = startDatabase;