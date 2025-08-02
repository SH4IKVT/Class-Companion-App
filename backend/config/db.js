const mongoose=require('mongoose');
MONGO_URL=''
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