const mongoose=require('mongoose');
MONGO_URL='mongodb+srv://kushalmondal24:7kNvuXzExWvODZm5@cluster0.a2zbsph.mongodb.net/'

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