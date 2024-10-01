const mongoose = require("mongoose")

const connBD = ()=>{
    const dbUrl = process.env.MongoDBurl
    mongoose.connect(dbUrl)
    .then(()=>{console.log("Success to connect to MongoDB ✅")})
    .catch(err=>{console.log("Error connecting to MongoDB:", err)});
}

module.exports = connBD;