const mongoose=require("mongoose");

const connectDb =async ()=>{
try {
    const dbOptions={
        useNewUrlParser: true
    }
    mongoose.set("strictQuery", false);
   await mongoose.connect(process.env.dataBase,dbOptions)
   console.log("Database is connected")
} catch (error) {
console.log(error);
}}
module.exports=connectDb;