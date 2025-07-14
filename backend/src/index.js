import { app } from "./app.js";
import { configDotenv } from "dotenv";
import connectToDb from "./db/index.js";

configDotenv();
connectToDb().then(e=>console.log("Connected to DB")).catch(error => console.log(error));
app.listen(process.env.PORT , () => {
    console.log("Server running on port", process.env.PORT );
});