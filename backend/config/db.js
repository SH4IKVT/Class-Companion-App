const mongoose=require('mongoose');
MONGO_URL='mongodb+srv://kushal:Dc75uxu4mBENNlhC@cluster0.ohlc4ta.mongodb.net/'
const connectDb=async ()=>{
    try{
        await mongoose.connect(MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('MongoDB connected');

    }catch(err){
        console.log('MongoDb connection error ',err);
        process.exit(1);
    }
};
module.exports=connectDb;