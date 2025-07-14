import mongoose from "mongoose";

const connectToDb = async() =>{ 
    await mongoose.connect(process.env.MONGO_URL);
}
export default connectToDb