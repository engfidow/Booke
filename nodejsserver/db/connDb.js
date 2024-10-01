const mongoose = require("mongoose")

const connBD = ()=>{
    mongoose.connect("mongodb+srv://golang:ZYmNTBZIel9in0H7@golangone.tlo7a.mongodb.net/library?retryWrites=true&w=majority&appName=golangone")
    .then(()=>{console.log("Success to connect to MongoDB ✅")})
    .catch(err=>{console.log("Error connecting to MongoDB:", err)});
}

module.exports = connBD;