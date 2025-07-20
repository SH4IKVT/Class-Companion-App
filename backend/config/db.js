const mongoose=require('mongoose');
MONGO_URL='mongodb+srv://testuser:test1234@cluster0.mtcedjp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
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