const mongoose=require('mongoose');
MONGO_URL='mongodb+srv://daminisingh1284:i2K97HAyDkQiu6zC@class-companion-cluster.g5ga203.mongodb.net/'
const connectDb=async ()=>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected');

    }catch(err){
        console.log('MongoDb connection error ',err);
        process.exit(1);
    }
};
module.exports=connectDb;