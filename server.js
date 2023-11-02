import { config } from "dotenv";
config();

import app from './app.js';
import connectionToDB from "./config/dbConnection.js";

//port listening 
const PORT = process.env.PORT ||5010;
app.listen(PORT, async ()=>{
    // Connect to DB
    await connectionToDB();
    console.log(`App is running at http://localhost:${PORT} `);
})